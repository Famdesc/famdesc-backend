import { Module } from "@nestjs/common";
import { UserController } from "../api/controllers/user.controller";
import { UserRepositoryPort } from "src/core/domain/user/ports/persistence/user-repository.port";
import { OrmUserRepository } from "src/infrastructure/adapter/persistence/orm/repository/user/orm-user.repository";
import { UserService } from "src/core/services/user/user.service";
import { CreateUserCommandHandler } from "src/core/domain/user/commands/create/create-user.command-handler";
import { UserCreatedEventHandler } from "src/core/domain/user/events-handler/user-created.event-handler";
import { PrismaModule } from "./prisma.module";





@Module({
    imports: [PrismaModule],
    exports: [],
    providers: [
    {
        provide: UserRepositoryPort,
        useClass: OrmUserRepository,
    },
    UserService,
    CreateUserCommandHandler,
    UserCreatedEventHandler
],
    controllers: [UserController],
})
export class UserModule {}