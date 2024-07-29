import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
    constructor(
        private readonly configService: NestConfigService,
    ) { }

    public get<T = any>(key: string): T | undefined {
        return this.configService.get<T>(key);
    }
}