import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StreamerService } from './streamer.service';

@Controller('streamer')
@ApiTags('Streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Get('search')
  @ApiOperation({ summary: '스트리머 검색' })
  @ApiQuery({ name: 'q', required: true, description: '검색어 (2자 이상)' })
  async getSearch(@Query('q') q: string): Promise<string> {
    return await this.streamerService.search(q);
  }

  @Get('name/:name')
  @ApiOperation({ summary: '스트리머 이름으로 조회' })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  async getName(@Param('name') name: string): Promise<string> {
    return await this.streamerService.getStreamerByName(name);
  }

  @Get('name/:name/live')
  @ApiOperation({ summary: '스트리머 생방송 여부 조회' })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  async getNameLive(@Param('name') name: string): Promise<string> {
    return await this.streamerService.getStreamerByNameLive(name);
  }

  @Get('name/:name/twip')
  @ApiOperation({ summary: '스트리머 트윕 가입여부 조회' })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  async getNameTwip(@Param('name') name: string): Promise<string> {
    return await this.streamerService.getStreamerByNameTwip(name);
  }

  @Get('name/:name/tgd')
  async getNameTgd(): Promise<string> {
    return await this.streamerService.getStreamerByNameTgd('');
  }

  @Get('id/:id')
  async getId(): Promise<string> {
    return await this.streamerService.getStreamerById('');
  }

  @Get('id/:id/twip')
  async getIdTwip(): Promise<string> {
    return await this.streamerService.getStreamerByIdTwip('');
  }

  @Get('id/:id/tgd')
  async getIdTgd(): Promise<string> {
    return await this.streamerService.getStreamerByIdTgd('');
  }
}
