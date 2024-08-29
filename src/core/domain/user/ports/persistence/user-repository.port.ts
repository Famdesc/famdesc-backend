import { User } from "../../user";

export abstract class UserRepositoryPort {
    abstract findAll(): Promise<User[]>;
    abstract save(user: User): Promise<User>;
}