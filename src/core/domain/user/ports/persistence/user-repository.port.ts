import { Optional } from "src/core/common/types/common.types";
import { User } from "../../models/user";


export abstract class UserRepositoryPort {
    abstract findAll(): Promise<User[]>;
    abstract save(user: User): Promise<User>;
    abstract findOne(user: {id?: string, email?: string}): Promise<Optional<User>>
    abstract findOneBy(args: any, includeDeleted: boolean): Promise<Optional<User>>;
}