import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import {
  CreateLinkDto,
  LinkItemsResponseDto,
  LinkResponseDto,
} from './dto/link.dto';
import { LinkService } from './link.service';
import { RealIP } from 'nestjs-real-ip';
import {
  ApiExceptionType,
  ApiResponseType,
  LinkNotFoundExceptionType,
  LinkUnprocessableEntityExceptionType,
} from 'src/common/api-response.dto';

@Controller('link')
@ApiTags('Link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get(':key')
  @ApiOperation({ summary: '링크 구성 조회' })
  @ApiParam({ name: 'key', required: true, description: '링크 key' })
  @ApiQuery({
    name: 'get_info',
    enum: ['true', 'false'],
    required: false,
    description: '유저 정보 함께 조회 여부',
    schema: {
      default: false,
    },
  })
  @ApiOkResponse({
    type: ApiResponseType(LinkItemsResponseDto, { isArray: false }),
  })
  @ApiNotFoundResponse({
    description: '링크가 존재하지 않을 때 발생합니다',
    type: ApiExceptionType(
      LinkNotFoundExceptionType,
      '존재하지 않는 링크입니다.',
      {
        statusCode: 404,
        error: 'Not Found',
      },
    ),
  })
  async getLink(
    @Param('key') key: string,
    @Query('get_info') getInfo = 'false',
  ): Promise<LinkItemsResponseDto> {
    if (getInfo === 'true') {
      return await this.linkService.getLinkWithInfo(key);
    } else {
      return await this.linkService.getLink(key);
    }
  }

  @Post('')
  @ApiOperation({ summary: '링크 구성 생성' })
  @ApiBody({ type: CreateLinkDto })
  @ApiOkResponse({
    type: ApiResponseType(LinkResponseDto, { isArray: false }),
  })
  @ApiUnprocessableEntityResponse({
    description: '올바른 인자를 넘겨주지 않았을 때 발생합니다',
    type: ApiExceptionType(
      LinkUnprocessableEntityExceptionType,
      '링크가 제공되지 않았습니다',
      {
        statusCode: 422,
        error: 'Unprocessable Entity',
      },
    ),
  })
  async createLink(
    @Body() link: CreateLinkDto,
    @Req() req: Request,
    @RealIP() ip: string,
  ): Promise<LinkResponseDto> {
    try {
      return await this.linkService.createLink(link, req, ip);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
