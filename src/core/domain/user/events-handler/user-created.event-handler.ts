import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../events/user-created.event";
import { Logger } from "@nestjs/common";

@EventsHandler()
export class UserCreatedEventHandler implements IEventHandler<UserCreatedEvent> {
    private readonly logger = new Logger(UserCreatedEventHandler.name)

    handle(event: UserCreatedEvent) {
        this.logger.log(`User created event: ${JSON.stringify(event)}`)
    }
}