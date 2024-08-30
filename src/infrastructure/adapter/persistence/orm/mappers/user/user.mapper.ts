import { User as ormUser, Prisma } from "@prisma/client";
import { User } from "src/core/domain/user/models/user";

export class UserMapper {
    public static toPersistence(domainUser: User): Prisma.UserCreateInput {
        return {
        id        : domainUser.getId(),
        firstname : domainUser.getFirstName(),
        lastname  : domainUser.getLastName(),
        email     : domainUser.getEmail(),
        password  : domainUser.getPassword(),
        
        createdAt : domainUser.getCreatedAt(),
        updatedAt : domainUser.getEditedAt() as Date,
        removedAt : domainUser.getRemovedAt() as Date,
        }
    }
      public static toPersistenceUsers(domainUsers: User[]): Prisma.UserCreateInput[] {
        return domainUsers.map(domainUser => this.toPersistence(domainUser));
      }
      
      public static toDomain(ormUser: ormUser): User {
        const domainUser: User = new User({
          firstname : ormUser.firstname,
          lastname  : ormUser.lastname,
          email     : ormUser.email,
          password  : ormUser.password,
          id        : ormUser.id,
          createdAt : ormUser.createdAt,
          updatedAt : ormUser.updatedAt,
          removedAt : ormUser.removedAt,
        });
        
        return domainUser;
      }
      
      public static toDomainUsers(ormUsers: ormUser[]): User[] {
        return ormUsers.map(ormUser => this.toDomain(ormUser));
      }
}