import { plainToClass } from 'class-transformer';
import { IsIn, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {

    @IsNumber()
    APP_PORT: number;

    @IsIn(['v1'])
    @IsString()
    APP_VERSION: string;

    @IsString()
    POSTGRES_URL: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}