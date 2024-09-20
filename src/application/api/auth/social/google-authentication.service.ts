import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import { AuthenticationService } from "../auth.service";
import { UserDITokens } from "src/core/domain/user/di/user-di.tokens";
import { UserRepositoryPort } from "src/core/domain/user/ports/persistence/user-repository.port";

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit{
    private oauthClient: OAuth2Client;
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthenticationService,
        @Inject(UserDITokens.UserRepository)
        private readonly userRepository: UserRepositoryPort,
    ){}

    onModuleInit() {
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
        this.oauthClient = new OAuth2Client(clientId, clientSecret)
    }

    async authenticate(token: string) {
        const loginTicket = await this.oauthClient.verifyIdToken({
            idToken: token
        })
        const {email, sub: googleId, name} = loginTicket.getPayload();
        const user = await this.userRepository.findOneBy({
            where : {googleId }
        }, false)
        if (user) {
            return this.authService.generateTokens(user)
        } else {
            // TODO: Guardar el usuario y devolver el token
            throw Error('Por implementar')
        }
    }
}