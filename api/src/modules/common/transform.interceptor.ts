import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
  msg?: string;
  success: boolean;
  [key: string]: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  // eslint-disable-next-line class-methods-use-this
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = response.statusCode;
        const url = request.originalUrl;
        const res = {
          statusCode,
          msg: 'ok',
          success: true,
          data,
          url,
        };
        return res;
      }),
    );
  }
}
