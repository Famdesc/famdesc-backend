import { Module, Provider } from "@nestjs/common";
import { HashingService } from "../api/auth/hashing/hashing.service";
import { BcryptService } from "../api/auth/hashing/bcrypt.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthenticationGuard } from "../api/auth/guards/auth.guard";
import { AccessTokenGuard } from "../api/auth/guards/access-token.guard";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "../api/auth/config/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user.module";
import { AuthController } from "../api/controllers/auth.controller";
import { AuthenticationService } from "../api/auth/auth.service";


const providers: Provider[] = [
    {
        provide: HashingService,
        useClass: BcryptService,
    },
    {
        provide: APP_GUARD,
        useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    AuthenticationService,
]


@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync(jwtConfig.asProvider()),
        ConfigModule.forFeature(jwtConfig)
    ],
    providers: providers,
    controllers: [AuthController],
})
export class AuthModule {}