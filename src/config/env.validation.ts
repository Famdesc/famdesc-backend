import { plainToClass } from 'class-transformer';
import { IsIn, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {

    @IsNumber()
    APP_PORT: number;

    @IsIn(['v1'])
    @IsString()
    APP_VERSION: string;

    @IsString()
    DATABASE_HOST: string;

    @IsNumber()
    DATABASE_PORT: number;

    @IsString()
    DATABASE_USERNAME: string;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_NAME: string;

    @IsString()
    DATABASE_ENTITIES: string;

    @IsString()
    DATABASE_MIGRATIONS: string;

    @IsString()
    DATABASE_ENTITIES_DIR: string;

    @IsString()
    DATABASE_MIGRATIONS_DIR: string;

    @IsString()
    BASE_URL: string;
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