import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiExceptionType,
  ApiResponseType,
  commonExceptionType,
  NotBroadcastingException,
  Response404,
  TgdException,
  TwipException,
} from 'src/common/api-response.dto';
import { StreamerLiveDto } from './dto/streamer-live.dto';
import {
  StreamerSearchDto,
  StreamerSearchLiveDto,
} from './dto/streamer-search.dto';
import { StreamerTgdDto } from './dto/streamer-tgd.dto';
import { StreamerTwipDto } from './dto/streamer-twip.dto';
import { StreamerDto } from './dto/streamer.dto';
import { StreamerService } from './streamer.service';

@Controller('streamer')
@ApiTags('Streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Get('search')
  @ApiOperation({ summary: '스트리머 검색' })
  @ApiQuery({ name: 'q', required: true, description: '검색어 (2자 이상)' })
  @ApiOkResponse({
    type: ApiResponseType(StreamerSearchLiveDto, { isArray: true }),
  })
  @ApiBadRequestResponse({
    description: '검색어가 2글자 미만일 때 발생합니다',
    type: ApiExceptionType(
      commonExceptionType,
      '검색어는 2글자 이상이어야 합니다.',
      {
        statusCode: 400,
        error: 'Bad Request',
      },
    ),
  })
  async getSearch(@Query('q') q: string): Promise<StreamerSearchDto> {
    return await this.streamerService.search(q);
  }

  @Get('name/:name')
  @ApiOperation({ summary: '스트리머 이름으로 조회' })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  @ApiOkResponse({
    type: ApiResponseType(StreamerDto, { isArray: false }),
  })
  @ApiNotFoundResponse({
    description: '스트리머가 트위치 회원이 아닐 때 발생합니다',
    type: ApiExceptionType(Response404, '스트리머를 찾을 수 없습니다.', {
      statusCode: 404,
      error: 'Not Found',
    }),
  })
  async getName(@Param('name') name: string): Promise<any> {
    return await this.streamerService.getStreamerByName(name);
  }

  @Get('name/:name/live')
  @ApiOperation({ summary: '스트리머 생방송 여부 조회' })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  @ApiOkResponse({
    type: ApiResponseType(StreamerLiveDto, { isArray: false }),
  })
  @ApiBadRequestResponse({
    description: '스트리머가 방송 중이지 않을 때 발생합니다',
    type: ApiExceptionType(
      NotBroadcastingException,
      '스트리머가 현재 방송 중이지 않습니다',
      {
        statusCode: 400,
        error: 'Bad Request',
      },
    ),
  })
  async getNameLive(@Param('name') name: string): Promise<any> {
    return await this.streamerService.getStreamerByNameLive(name);
  }

  @Get('name/:name/twip')
  @ApiOperation({
    summary: '스트리머 트윕 정보 조회',
    description:
      'api.twip.kr/user/{username} API Route (프론트에서 fallback으로 twip api 직접 호출해서 사용해도 무방)',
  })
  @ApiOkResponse({
    type: ApiResponseType(StreamerTwipDto, { isArray: false }),
  })
  @ApiNotFoundResponse({
    description: '스트리머가 트윕 회원이 아닐 때 발생합니다',
    type: ApiExceptionType(
      TwipException,
      '해당 스트리머는 Twip 회원이 아닙니다.',
      {
        statusCode: 404,
        error: 'Not Found',
      },
    ),
  })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  async getNameTwip(@Param('name') name: string): Promise<any> {
    return await this.streamerService.getStreamerByNameTwip(name);
  }

  @Get('name/:name/tgd')
  @ApiOperation({
    summary: '스트리머 트게더 게시판 존재 여부 조회',
    description: '트게더 API Route',
  })
  @ApiOkResponse({
    type: ApiResponseType(StreamerTgdDto, { isArray: false }),
  })
  @ApiNotFoundResponse({
    description: '스트리머가 트게더 게시판을 보유하고 있지 않을 때 발생합니다',
    type: ApiExceptionType(
      TgdException,
      '해당 스트리머는 트게더 게시판을 보유하고 있지 않습니다.',
      {
        statusCode: 404,
        error: 'Not Found',
      },
    ),
  })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  async getNameTgd(@Param('name') name: string): Promise<any> {
    return await this.streamerService.getStreamerByNameTgd(name);
  }

  @Get('id/:id')
  @ApiOperation({ summary: '스트리머 ID로 조회' })
  @ApiParam({ name: 'id', required: true, description: '스트리머 ID' })
  @ApiOkResponse({
    type: ApiResponseType(StreamerDto, { isArray: false }),
  })
  @ApiNotFoundResponse({
    description: '스트리머가 트위치 회원이 아닐 때 발생합니다',
    type: ApiExceptionType(Response404, '스트리머를 찾을 수 없습니다.', {
      statusCode: 404,
      error: 'Not Found',
    }),
  })
  async getId(@Param('id') id: number): Promise<any> {
    return await this.streamerService.getStreamerById(id);
  }

  @Get('id/:id/live')
  @ApiOperation({ summary: '스트리머 생방송 여부 조회 ID로 조회' })
  @ApiParam({ name: 'id', required: true, description: '스트리머 ID' })
  @ApiOkResponse({
    type: ApiResponseType(StreamerLiveDto, { isArray: false }),
  })
  @ApiBadRequestResponse({
    description: '스트리머가 방송 중이지 않을 때 발생합니다',
    type: ApiExceptionType(
      NotBroadcastingException,
      '스트리머가 현재 방송 중이지 않습니다',
      {
        statusCode: 400,
        error: 'Bad Request',
      },
    ),
  })
  async getIdLive(@Param('id') id: number): Promise<any> {
    return await this.streamerService.getStreamerByIdLive(id);
  }
}
