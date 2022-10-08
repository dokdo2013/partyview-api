import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonResponse, Response200, Response201 } from './api-response.dto';

@Injectable()
export class ApiOutputInterceptor<T>
  implements NestInterceptor<T, CommonResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CommonResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const status = context.switchToHttp().getResponse().statusCode;

        if (status === 200) {
          const response: Response200<T> = {
            status,
            message: '데이터 로딩에 성공했습니다.',
            data,
          };
          return response;
        } else if (status === 201) {
          const response: Response201<T> = {
            status,
            message: '데이터가 성공적으로 생성되었습니다.',
            data,
          };
          return response;
        } else {
          // 이외의 경우는 그냥 그대로 리턴
          return data;
        }
      }),
    );
  }
}
