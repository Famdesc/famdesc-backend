import { User } from "../user";

export class UserCreatedEvent {
    constructor(public readonly user: User){}
}