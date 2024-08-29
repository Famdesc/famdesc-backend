import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserCommmand } from "src/core/domain/user/commands/create/create-user.command";

@Injectable()
export class UserService {
    constructor(
        private readonly commandBus: CommandBus,
    ) {}

    create(createUserCommand: CreateUserCommmand) {
        return this.commandBus.execute(createUserCommand)
    }
}