import { Inject } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { UserDITokens } from "src/core/domain/user/di/user-di.tokens";
import { UserRepositoryPort } from "src/core/domain/user/ports/persistence/user-repository.port";
import { HashingService } from "./hashing/hashing.service";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "./config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { Exception } from "src/core/common/exception";
import { Code } from "src/core/common/code";
import { randomUUID } from "crypto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ActiveUserData } from "./interfaces/active-user-data.interface";
import { User } from "src/core/domain/user/models/user";

export class AuthenticationService {
    constructor(
        @Inject(UserDITokens.UserRepository)
        private readonly userRepository: UserRepositoryPort,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}

    async signIn(signInDto: SignInDto) {
        const user = await this.userRepository.findOne({
            email: signInDto.email,
        })
        if(!user) {
            throw Exception.new({code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'User not found'})
        }
        const isEqual = await this.hashingService.compare(
            signInDto.password,
            user.getPassword(),
        )
        if (!isEqual) {
            throw Exception.new({code: Code.WRONG_CREDENTIALS_ERROR})
        }
        return await this.generateTokens(user)
    }

    async generateTokens(user: User){
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([
          this.signToken<Partial<ActiveUserData>>(
            user.getId(),
            this.jwtConfiguration.accessTokenTtl,
            { email: user.getEmail()},
          ),
          this.signToken(user.getId(), this.jwtConfiguration.refreshTokenTtl, {
            refreshTokenId,
          }),
        ]);
        return {
          refreshToken,
          accessToken,
        };
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto){
        try {
            const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
            Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
          >(refreshTokenDto.refreshToken, {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
          });
          const user = await this.userRepository.findOne({
            id: sub
          })
          return this.generateTokens(user)
        }catch(err) {
            throw Exception.new({code: Code.UNAUTHORIZED_ERROR})
        }
    }
    private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
          {
            sub: userId,
            ...payload,
          },
          {
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            secret: this.jwtConfiguration.secret,
            expiresIn,
          },
        );
      }
}