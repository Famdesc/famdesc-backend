import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigService } from './config.service';
import configuration from './configuration';
import { validate } from './env.validation';

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            validate,
            envFilePath: `.env`,
            load: [configuration],
        }),
    ],
    providers: [
        ConfigService,
    ],
    exports: [ConfigService],
})
export class ConfigModule { }