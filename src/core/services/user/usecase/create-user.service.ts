import { Code } from "src/core/common/code";
import { Exception } from "src/core/common/exception";
import { CoreAssert } from "src/core/common/util/core-assert";
import { User } from "src/core/domain/user/models/user";
import { UserRepositoryPort } from "src/core/domain/user/ports/persistence/user-repository.port";
import { CreateUserPort } from "src/core/domain/user/ports/usecase/create-user.port";
import { CreateUserUseCase } from "src/core/domain/user/use-case/create-user.usecase";
import { UserUseCaseDto } from "src/core/domain/user/use-case/dto/user-usecase.dto";

export class CreateUserService implements CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryPort
    ){}

    public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
        const doesUserExist: boolean = !! await this.userRepository.findOne({email: payload.email})
        CoreAssert.isFalse(doesUserExist, Exception.new({code: Code.ENTITY_ALREADY_EXISTS_ERROR, overrideMessage: 'User already exists.'}))
        
        const user: User = await User.new({
            username: payload.username,
            email: payload.email,
            password: payload.password
        })

        await this.userRepository.save(user)

        return UserUseCaseDto.newFromUser(user)
    }
}