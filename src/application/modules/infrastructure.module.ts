import { Global, Module, Provider } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { NestHttpExceptionFilter } from "src/core/common/exception";
import { HttpLoggingInterceptor } from "../api/interceptor/http-loggin.interceptor";
import { CoreDITokens } from "src/core/common/di/core-di.tokens";
import { CommandBusAdapter, EventBusAdapter } from "src/infrastructure/adapter/message";

const providers: Provider[] = [
    {
        provide: APP_FILTER,
        useClass: NestHttpExceptionFilter,
    },
    {
        provide: CoreDITokens.CommandBus,
        useClass: CommandBusAdapter
    },
    {
        provide: CoreDITokens.EventBus,
        useClass: EventBusAdapter
    }
]

if (process.env.LOG_ENABLE) {
    providers.push({
      provide : APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    });
  }
  

@Global()
@Module({
    imports: [CqrsModule],
    providers: providers,
    exports: [
        CoreDITokens.CommandBus,
        CoreDITokens.EventBus,
    ]
})
export class InfrastructureModule {}