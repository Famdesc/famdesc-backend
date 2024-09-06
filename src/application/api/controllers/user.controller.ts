import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { CoreApiResponse } from "src/core/common/api/core-api.response";
import { UserDITokens } from "src/core/domain/user/di/user-di.tokens";
import { CreateUserUseCase } from "src/core/domain/user/use-case/create-user.usecase";
import { UserUseCaseDto } from "src/core/domain/user/use-case/dto/user-usecase.dto";
import { CreateUserAdapter } from "src/infrastructure/adapter/usecase/user/create-user.adapter";
import { Auth } from "../auth/decorators/auth.decorator";
import { AuthType } from "../auth/enums/auth-type.enum";

@Auth(AuthType.None)
@Controller('user')
export class UserController {
    constructor(
        @Inject(UserDITokens.CreateUserUseCase)
        private readonly createUserUseCase: CreateUserUseCase,
      ) {}

    @Post()
    public async createAccount(@Body() body: any) {

        const adapter: CreateUserAdapter = await CreateUserAdapter.new({
            username   : body.username,
            email      : body.email,
            password   : body.password
        });

        const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(adapter);

        return CoreApiResponse.success(createdUser)
    }
}