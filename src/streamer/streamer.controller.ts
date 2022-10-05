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
  async getSearch(@Query('q') q: string): Promise<any> {
    return await this.streamerService.search(q);
  }

  @Get('name/:name')
  @ApiOperation({ summary: '스트리머 이름으로 조회' })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  async getName(@Param('name') name: string): Promise<any> {
    return await this.streamerService.getStreamerByName(name);
  }

  @Get('name/:name/live')
  @ApiOperation({ summary: '스트리머 생방송 여부 조회' })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  async getNameLive(@Param('name') name: string): Promise<any> {
    return await this.streamerService.getStreamerByNameLive(name);
  }

  @Get('name/:name/twip')
  @ApiOperation({
    summary: '스트리머 트윕 정보 조회',
    description:
      'api.twip.kr/user/{username} API Route (프론트에서 fallback으로 twip api 직접 호출해서 사용해도 무방)',
  })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  async getNameTwip(@Param('name') name: string): Promise<any> {
    return await this.streamerService.getStreamerByNameTwip(name);
  }

  @Get('name/:name/tgd')
  @ApiOperation({
    summary: '스트리머 트게더 회원가입 여부 조회',
    description: 'tgd api route',
  })
  @ApiParam({ name: 'name', required: true, description: '스트리머 로그인 ID' })
  async getNameTgd(@Param('name') name: string): Promise<any> {
    return await this.streamerService.getStreamerByNameTgd(name);
  }

  @Get('id/:id')
  @ApiOperation({ summary: '스트리머 ID로 조회' })
  @ApiParam({ name: 'id', required: true, description: '스트리머 ID' })
  async getId(@Param('id') id: number): Promise<any> {
    return await this.streamerService.getStreamerById(id);
  }

  @Get('id/:id/live')
  @ApiOperation({ summary: '스트리머 생방송 여부 조회 ID로 조회' })
  @ApiParam({ name: 'id', required: true, description: '스트리머 ID' })
  async getIdLive(@Param('id') id: number): Promise<any> {
    return await this.streamerService.getStreamerByIdLive(id);
  }
}
