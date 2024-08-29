import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './modules/app.module';
import { Logger } from '@nestjs/common';

export class ServerApplication {
    private readonly host: string = process.env.HOST;

    private readonly port: number = +process.env.PORT;


    public async run(): Promise<void> {
       const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);


       await app.listen(this.port, this.host)
    }

    private log(): void {
        Logger.log(`Server started on host: ${this.host}; port: ${this.port}`, ServerApplication.name)
    }

    public static new(): ServerApplication {
        return new ServerApplication();
    }
}