import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from 'express';
import { CoreApiResponse } from "../api/core-api.response";
import { Code } from "../code";
import { Exception } from "./exception";

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  
  public catch(error: Error, host: ArgumentsHost): void {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();
    
    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(Code.INTERNAL_ERROR.code, error.message);
  
    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);
    
    if (process.env.LOG_ENABLE) {
      const message: string =
        `Method: ${request.method}; ` +
        `Path: ${request.path}; `+
        `Error: ${errorResponse.message}`;
  
      Logger.error(message);
    }
    
    response.json(errorResponse);
  }
  
  private handleNestError(error: Error, errorResponse: CoreApiResponse<unknown>): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(error.getStatus(), error.message, null);
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(Code.UNAUTHORIZED_ERROR.code, Code.UNAUTHORIZED_ERROR.message, null);
    }
    
    return errorResponse;
  }
  
  private handleCoreException(error: Error, errorResponse: CoreApiResponse<unknown>): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(error.code, error.message, error.data);
    }
    
    return errorResponse;
  }

}
