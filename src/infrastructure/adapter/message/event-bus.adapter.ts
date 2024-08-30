import { Injectable } from "@nestjs/common";
import { EventBus, IEvent } from "@nestjs/cqrs";
import { EventBusPort } from "src/core/common/port/event-bus.port";

@Injectable()
export class EventBusAdapter implements EventBusPort {
    constructor(
        private readonly eventBus: EventBus
    ){}
    public async sendEvent<TEvent extends object>(event: TEvent): Promise<void> {
        return this.eventBus.publish(event as IEvent)
    }
}