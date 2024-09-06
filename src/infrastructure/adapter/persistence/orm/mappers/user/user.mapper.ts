import { User as ormUser, Prisma } from "@prisma/client";
import { User } from "src/core/domain/user/models/user";

export class UserMapper {
    public static toPersistence(domainUser: User): Prisma.UserCreateInput {
        return {
        id        : domainUser.getId(),
        username  : domainUser.getUserName(),
        email     : domainUser.getEmail(),
        password  : domainUser.getPassword(),
        
        created_at : domainUser.getCreatedAt(),
        updated_at : domainUser.getEditedAt() as Date,
        removed_at : domainUser.getRemovedAt() as Date,
        }
    }
      public static toPersistenceUsers(domainUsers: User[]): Prisma.UserCreateInput[] {
        return domainUsers.map(domainUser => this.toPersistence(domainUser));
      }
      
      public static toDomain(ormUser: ormUser): User {
        const domainUser: User = new User({
          username  : ormUser.username,
          email     : ormUser.email,
          password  : ormUser.password,
          id        : ormUser.id,
          createdAt : ormUser.created_at,
          updatedAt : ormUser.updated_at,
          removedAt : ormUser.removed_at,
        });
        
        return domainUser;
      }
      
      public static toDomainUsers(ormUsers: ormUser[]): User[] {
        return ormUsers.map(ormUser => this.toDomain(ormUser));
      }
}