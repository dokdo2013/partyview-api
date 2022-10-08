import { ApiProperty } from '@nestjs/swagger';

export class TgdCategory {
  @ApiProperty({
    description: '게시판 이름',
    type: String,
    example: '공지',
  })
  title: string;

  @ApiProperty({
    description: '게시판 번호',
    type: String,
    example: '1145911',
  })
  categoryId: string;

  @ApiProperty({
    description: '게시판 색상',
    type: String,
    example: '#3640f7',
  })
  color: string;

  @ApiProperty({
    description: '게시판 권한 (admin | any)',
    type: String,
    example: 'admin',
  })
  auth: string;

  @ApiProperty({
    description: '게시판 순서',
    type: String,
    example: '1135849',
  })
  order: string;
}

export class StreamerTgdDto {
  @ApiProperty({
    description: '트게더 게시판 이름',
    type: String,
    example: '김나성',
  })
  title: string;

  @ApiProperty({
    description: '트게더 게시판 타입',
    type: String,
    example: 'streamer',
  })
  type: string;

  @ApiProperty({
    description: '게시판 프로필 이미지',
    type: String,
    example:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/ea777be2-7415-4ef2-8512-20083e08e9db-profile_image-300x300.png',
  })
  profileImageUrl: string;

  @ApiProperty({
    description: '게시판 배경 이미지',
    type: String,
    nullable: true,
    example: null,
  })
  backgroundImageUrl: string;

  @ApiProperty({
    description: '테마 색상',
    type: String,
    example: '#6411a5',
  })
  color: string;

  @ApiProperty({
    description: '트게더 게시판 즐겨찾기 여부',
    type: Boolean,
    default: false,
    example: false,
  })
  favorite: boolean;

  @ApiProperty({
    description: '트위치 생방송 여부',
    type: Boolean,
    default: false,
    example: false,
  })
  isLive: boolean;

  @ApiProperty({
    description: '트게더 알림 타입',
    type: Boolean,
    example: false,
  })
  alertType: boolean;

  @ApiProperty({
    description: '트위치 URL',
    type: String,
    example: 'https://twitch.tv/naseongkim',
  })
  twitchUrl: string;

  @ApiProperty({
    description: '유튜브 URL',
    type: String,
    example: 'https://youtube.com/channel/UCRjQDHdSObypL53Lez8XTBA',
  })
  youtubeUrl: string;

  @ApiProperty({
    description: '트윕 URL',
    type: String,
    example: 'https://twip.kr/naseongkim',
  })
  twipUrl: string;

  @ApiProperty({
    description: '게시판 점수',
    type: Number,
    example: 169027597,
  })
  boardScore: number;

  @ApiProperty({
    description: '게시판 즐겨찾기 수',
    type: Number,
    example: 4972,
  })
  favoCount: number;

  @ApiProperty({
    description: '게시판 카테고리',
    type: TgdCategory,
    isArray: true,
  })
  categories: TgdCategory[];
}
