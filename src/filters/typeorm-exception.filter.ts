import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    console.log('exception', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    if ((exception.driverError as any).code === '23505') {
      // PostgreSQL unique_violation
      // You can customize the error message based on the constraint name if needed
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Unprocessable Entity',
        // timestamp: new Date().toISOString(),
        // path: request.url,
        message: 'Duplicate entry.',
      });
    } else {
      // Handle other QueryFailedError types or re-throw as a generic error
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Unprocessable Entity',
        // timestamp: new Date().toISOString(),
        // path: request.url,
        message: 'Database error.', // Or a more specific message
      });
    }
  }
}
