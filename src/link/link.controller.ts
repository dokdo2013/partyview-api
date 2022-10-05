import { Controller, Delete, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LinkService } from './link.service';

@Controller('link')
@ApiTags('Link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('')
  async createLink(): Promise<string> {
    return await this.linkService.createLink('streamerId');
  }

  @Delete('')
  async deleteLink(): Promise<string> {
    return await this.linkService.deleteLink('streamerId');
  }
}
