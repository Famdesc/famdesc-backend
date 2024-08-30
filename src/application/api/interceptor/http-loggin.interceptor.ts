import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { CoreApiResponse } from "src/core/common/api/core-api.response";
import { Request } from 'express';


@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  
  public intercept(context: ExecutionContext, next: CallHandler): Observable<CoreApiResponse<void>> {
    const request: Request = context.switchToHttp().getRequest();
    const requestStartDate: number = Date.now();
    
    return next.handle().pipe(tap((): void => {
      const requestFinishDate: number = Date.now();
      
      const message: string =
        `Method: ${request.method}; ` +
        `Path: ${request.path}; ` +
        `SpentTime: ${requestFinishDate - requestStartDate}ms`;
      
      Logger.log(message, HttpLoggingInterceptor.name);
    }));
  }
}
