import { IsString, IsEmail, IsDate, IsOptional } from "class-validator";
import { BaseModel } from "src/core/common/model/base-model";
import { Nullable } from "src/core/common/types/common.types";
import { v4 } from 'uuid';
import { CreateUserPayload } from "./type/create-user.payload";
import { genSalt, hash } from "bcrypt";
export class User extends BaseModel<string> {
    @IsString()
    private username: string;

    @IsEmail()
    private readonly email: string;
    
    @IsString()
    private password: string;
    
    @IsDate()
    private readonly created_at: Date;
    
    @IsOptional()
    @IsDate()
    private updated_at: Nullable<Date>;
    
    @IsOptional()
    @IsDate()
    private removed_at: Nullable<Date>;
    
    constructor(payload: CreateUserPayload) {
      super();
      this.username  = payload.username
      this.email     = payload.email;
      this.password  = payload.password;
    
      this.id         = payload.id || v4();;
      this.created_at = payload.createdAt || new Date();
      this.updated_at = payload.updatedAt || new Date();
      this.removed_at = payload.removedAt || null;
    }
    
    
    public getUserName(): string {
      return this.username
    }
    
    public getEmail(): string {
      return this.email;
    }
    
    public getPassword(): string {
      return this.password;
    }
    
    public getCreatedAt(): Date {
      return this.created_at
    }
    
    public getEditedAt(): Nullable<Date> {
      return this.updated_at
    }
    
    public getRemovedAt(): Nullable<Date> {
      return this.removed_at;
    }

    public async hashPassword(): Promise<void> {
      const salt: string = await genSalt();
      this.password = await hash(this.password, salt);
      
      await this.validate();
    }

    
    public static async new(payload: CreateUserPayload): Promise<User> {
      const user: User = new User(payload);
      await user.hashPassword();
      await user.validate();
      return user;
    }
}