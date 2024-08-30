import { Code } from "../code";
import { Exception } from "../exception";
import { Optional } from "../types/common.types";
import { ClassValidationDetails, ClassValidator } from "../util/class-validator";

export class UseCaseValidatableAdapter {
  
    public async validate(): Promise<void> {
      const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
      if (details) {
        throw Exception.new({code: Code.USE_CASE_PORT_VALIDATION_ERROR, data: details});
      }
    }
    
  }