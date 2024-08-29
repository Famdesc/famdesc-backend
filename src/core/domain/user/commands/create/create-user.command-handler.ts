import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommmand } from "./create-user.command";
import { Logger } from "@nestjs/common";
import { UserRepositoryPort } from "../../ports/persistence/user-repository.port";
import { UserCreatedEvent } from "../../events/user-created.event";


@CommandHandler(CreateUserCommmand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommmand>{
    private readonly logger = new Logger(CreateUserCommandHandler.name)

    constructor(
        private readonly userRepository: UserRepositoryPort,
        private readonly eventBus: EventBus,
    ){}

    async execute(command: CreateUserCommmand): Promise<any> {
        this.logger.debug(
            `Processing "CreateUserCommand": ${JSON.stringify(command)}`,
        )
        const user = await this.userRepository.save(command)
        this.eventBus.publish(new UserCreatedEvent(command))
        return user
    }
}