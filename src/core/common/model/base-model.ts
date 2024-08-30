import { Code } from "../code";
import { Exception } from "../exception";
import { Optional } from "../types/common.types";
import { ClassValidationDetails, ClassValidator } from "../util/class-validator";

export class BaseModel<TIdentifier extends string|number> {
  
    protected id: Optional<TIdentifier>;
    
    public getId(): TIdentifier {
      if (typeof this.id === 'undefined') {
        throw Exception.new({code: Code.ENTITY_VALIDATION_ERROR, overrideMessage: `${this.constructor.name}: ID is empty.`});
      }
      
      return this.id;
    }
    
    public async validate(): Promise<void> {
      const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
      if (details) {
        throw Exception.new({code: Code.ENTITY_VALIDATION_ERROR, data: details});
      }
    }
    
  }