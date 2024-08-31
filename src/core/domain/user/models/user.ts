import { IsString, IsEmail, IsDate, IsOptional } from "class-validator";
import { BaseModel } from "src/core/common/model/base-model";
import { Nullable } from "src/core/common/types/common.types";
import { v4 } from 'uuid';
import { CreateUserPayload } from "./type/create-user.payload";
import { genSalt, hash } from "bcrypt";
export class User extends BaseModel<string> {
    @IsString()
    private firstname: string;
    
    @IsString()
    private lastname: string;
    
    @IsEmail()
    private readonly email: string;
    
    @IsString()
    private password: string;
    
    @IsDate()
    private readonly createdAt: Date;
    
    @IsOptional()
    @IsDate()
    private updatedAt: Nullable<Date>;
    
    @IsOptional()
    @IsDate()
    private removedAt: Nullable<Date>;
    
    constructor(payload: CreateUserPayload) {
      super();
    
      this.firstname = payload.firstname;
      this.lastname  = payload.lastname;
      this.email     = payload.email;
      this.password  = payload.password;
    
      this.id        = payload.id || v4();;
      this.createdAt = payload.createdAt || new Date();
      this.updatedAt  = payload.updatedAt || new Date();
      this.removedAt = payload.removedAt || null;
    }
    
    public getFirstName(): string {
      return this.firstname;
    }
    
    public getLastName(): string {
      return this.lastname;
    }
    
    public getName(): string {
      return `${this.firstname} ${this.lastname}`;
    }
    
    public getEmail(): string {
      return this.email;
    }
    
    public getPassword(): string {
      return this.password;
    }
    
    public getCreatedAt(): Date {
      return this.createdAt;
    }
    
    public getEditedAt(): Nullable<Date> {
      return this.updatedAt;
    }
    
    public getRemovedAt(): Nullable<Date> {
      return this.removedAt;
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