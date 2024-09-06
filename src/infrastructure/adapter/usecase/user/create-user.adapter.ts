import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { UseCaseValidatableAdapter } from "src/core/common/adapter/usecase-validatable.adapter";
import { CreateUserPort } from "src/core/domain/user/ports/usecase/create-user.port";

@Exclude()
export class CreateUserAdapter extends UseCaseValidatableAdapter implements CreateUserPort {
    @Expose()
    @IsString()
    public username: string;
    @Expose()
    @IsString()
    public password: string;
    @Expose()
    @IsEmail()
    public email: string;

    public static async new(payload: CreateUserPort): Promise<CreateUserAdapter> {
        const adapter: CreateUserAdapter = plainToInstance(CreateUserAdapter, payload)
        await adapter.validate()
        return adapter;
    }
}  