import { Injectable } from "@nestjs/common";
import { CommandBus, IEvent } from "@nestjs/cqrs";
import { CommandBusPort } from "src/core/common/port/command-bus.port";

@Injectable()
export class CommandBusAdapter implements CommandBusPort {
    constructor(
        private readonly commandBus: CommandBus
    ) {}
    public async sendCommand<TCommand extends object>(command: TCommand): Promise<void> {
        return this.commandBus.execute(command as IEvent) 
    }
}