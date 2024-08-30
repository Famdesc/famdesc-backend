import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsUUID } from "class-validator";
import { UseCaseValidatableAdapter } from "src/core/common/adapter/usecase-validatable.adapter";
import { GetUserPort } from "src/core/domain/user/ports/usecase/get-user.port";

@Exclude()
export class GetUserAdapter extends UseCaseValidatableAdapter implements GetUserPort {
    @Expose()
    @IsUUID()
    public userId: string;
    
    public static async new(payload: GetUserPort): Promise<GetUserAdapter> {
      const adapter: GetUserAdapter = plainToInstance(GetUserAdapter, payload);
      await adapter.validate();
      
      return adapter;
    }
}