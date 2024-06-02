import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                ...configService.get('database'),
                // autoLoadEntities: true,
                entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
            }),
            inject: [ConfigService],
        })
    ],
    exports: [
        TypeOrmModule
    ],
})
export class DatabaseModule { }
