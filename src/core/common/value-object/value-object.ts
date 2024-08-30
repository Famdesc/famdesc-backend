import { Code } from "../code";
import { Exception } from "../exception";
import { Optional } from "../types/common.types";
import { ClassValidationDetails, ClassValidator } from "../util/class-validator";

export class ValueObject {
  
    public async validate(): Promise<void> {
      const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
      if (details) {
        throw Exception.new({code: Code.VALUE_OBJECT_VALIDATION_ERROR, data: details});
      }
    }
    
  }
  