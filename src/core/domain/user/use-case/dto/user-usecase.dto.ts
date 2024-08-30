
import { Exclude, Expose, plainToInstance } from "class-transformer";
import { User } from "../../models/user";

@Exclude()
export class UserUseCaseDto {

  @Expose()
  public id: string;
  
  @Expose()
  public firstname: string;
  
  @Expose()
  public lastname: string;
  
  @Expose()
  public email: string;

  public static newFromUser(user: User): UserUseCaseDto {
    return plainToInstance(UserUseCaseDto, user);
  }
  
  public static newListFromUsers(users: User[]): UserUseCaseDto[] {
    return users.map(user => this.newFromUser(user));
  }
  
}