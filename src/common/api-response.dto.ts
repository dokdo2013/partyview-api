import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface CommonResponse<T> {
  status: number;
  message: string;
  data: T;
}

export class Response200<T> implements CommonResponse<T> {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: '데이터 로딩에 성공했습니다.' })
  message: string;

  @ApiProperty()
  data: T;
}

export class Response201<T> implements CommonResponse<T> {
  @ApiProperty({ example: 201 })
  status: number;

  @ApiProperty({ example: '데이터가 성공적으로 생성되었습니다.' })
  message: string;

  @ApiProperty()
  data: T;
}

export class Response400<T> implements CommonResponse<T> {
  @ApiProperty({ example: 400 })
  status: number;

  @ApiProperty({ example: '오류가 발생했습니다.' })
  message: string;

  @ApiProperty()
  data: T;
}

export class Response401<T> implements CommonResponse<T> {
  @ApiProperty({ example: 401 })
  status: number;

  @ApiProperty({ example: '인증이 필요합니다.' })
  message: string;

  @ApiProperty()
  data: T;
}

export class Response403<T> implements CommonResponse<T> {
  @ApiProperty({ example: 403 })
  status: number;

  @ApiProperty({ example: '권한이 필요합니다.' })
  message: string;

  @ApiProperty()
  data: T;
}

export class Response500<T> implements CommonResponse<T> {
  @ApiProperty({ example: 500 })
  status: number;

  @ApiProperty({ example: '서버 오류가 발생했습니다.' })
  message: string;

  @ApiProperty()
  data: T;
}

interface ApiOptions {
  statusCode: number;
  isArray: boolean;
  nullable: boolean;
  error?: string;
}

export function ApiResponseType<T>(
  classRef: Type<T>,
  options?: Partial<ApiOptions>,
): Type<CommonResponse<T>> {
  abstract class ApiResponseTypeClass implements CommonResponse<T> {
    @ApiProperty({ type: Number, default: options?.statusCode ?? 200 })
    status: number;

    @ApiProperty({ type: String, default: '데이터 로딩에 성공했습니다.' })
    message: string;

    @ApiProperty({
      type: classRef,
      isArray: options?.isArray ?? false,
      nullable: options?.nullable ?? false,
    })
    data: T;
  }

  Object.defineProperty(ApiResponseTypeClass, 'name', {
    value: `${classRef.name}${options?.isArray ? 'Array' : ''}Type`,
    writable: false,
  });

  return ApiResponseTypeClass as Type<ApiResponseTypeClass>;
}

export interface CommonExceptionDto {
  statusCode: number;
  error: string;
}

export interface CommonException<T> {
  statusCode: number;
  message: T;
  error: string;
}

export function ApiExceptionType<T>(
  classRef: Type<T>,
  message: string,
  options?: Partial<ApiOptions>,
): Type<CommonExceptionDto> {
  abstract class ApiExceptionTypeClass implements CommonExceptionDto {
    @ApiProperty({
      type: Number,
      example: options?.statusCode ?? 400,
    })
    statusCode: number;

    @ApiProperty({
      type: classRef,
      example: message,
    })
    message: T;

    @ApiProperty({
      type: String,
      example: options?.error ?? 'Bad Request',
    })
    error: string;
  }

  Object.defineProperty(ApiExceptionTypeClass, 'name', {
    value: `${classRef.name}Type`,
    writable: false,
  });

  return ApiExceptionTypeClass as Type<ApiExceptionTypeClass>;
}

export class commonExceptionType<T> implements CommonExceptionDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty()
  message: T;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class NotBroadcastingException<T> implements CommonExceptionDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty()
  message: T;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class Response404<T> implements CommonExceptionDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty()
  message: T;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}

export class TwipException<T> implements CommonExceptionDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty()
  message: T;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}

export class TgdException<T> implements CommonExceptionDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty()
  message: T;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
