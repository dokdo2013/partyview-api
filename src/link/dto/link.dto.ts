import { ApiProperty } from '@nestjs/swagger';
import { StreamerDto } from 'src/streamer/dto/streamer.dto';
import { User } from '../entities/user.entity';

export class LinkResponseDto {
  @ApiProperty({
    description: '단축 링크',
    type: String,
    example: 'a1b2c3d4',
  })
  link: string;
}

export class LinkItemsResponseDto {
  @ApiProperty({
    description: '링크 구성',
    example: ['kimdoe', 'saddummy'],
  })
  items: string[] | Promise<StreamerDto>[];
}

export class LinkDto {
  key: string;
  userIp: string;
  userAgent: string;
  createdAt: Date;
}

export class LinkCreateDto {
  key: string;
}

export class CreateLinkDto {
  @ApiProperty({
    description: '링크 생성할 스트리머 아이디',
    type: String,
    isArray: true,
    example: ['kimdoe', 'saddummy'],
  })
  items: string[];
}
