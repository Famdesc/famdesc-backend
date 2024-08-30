import { UseCase } from "src/core/common/usecase";
import { CreateUserPort } from "../ports/usecase/create-user.port";
import { UserUseCaseDto } from "./dto/user-usecase.dto";

export interface CreateUserUseCase extends UseCase<CreateUserPort, UserUseCaseDto> {}