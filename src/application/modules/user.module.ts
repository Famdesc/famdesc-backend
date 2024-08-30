import { Module, Provider } from "@nestjs/common";
import { UserDITokens } from "src/core/domain/user/di/user-di.tokens";
import { CreateUserService } from "src/core/services/user/usecase/create-user.service";
import { OrmUserRepository } from "src/infrastructure/adapter/persistence/orm/repository/user/orm-user.repository";
import { UserController } from "../api/controllers/user.controller";
import { PrismaModule } from "./prisma.module";

const persistenceProviders: Provider[] = [
 {
    provide : UserDITokens.UserRepository,
    useClass: OrmUserRepository
 }
];

const useCaseProviders: Provider[] = [
 {
    provide   : UserDITokens.CreateUserUseCase,
    useFactory: userRepository => new CreateUserService(userRepository),
    inject    : [UserDITokens.UserRepository]
 }
];

@Module({
    imports: [PrismaModule],
    exports  : [UserDITokens.UserRepository],
    providers: [
        ...persistenceProviders,
        ...useCaseProviders,
    ],
    controllers: [UserController],
})
export class UserModule {}