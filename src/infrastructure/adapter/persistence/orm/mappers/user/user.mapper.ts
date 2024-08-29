import { User as ormUser } from "@prisma/client";
import { User } from "src/core/domain/user/user";

export class UserMapper {
    static toDomain(ormUser: ormUser): User {
        const userModel = new User(
            ormUser.id,
            ormUser.email,
            ormUser.password
        )
        return userModel
    }
    static toPersistence(user: User) {
        return {
            id: user.id,
            password: user.password,
            email: user.email,
        }
    }
}