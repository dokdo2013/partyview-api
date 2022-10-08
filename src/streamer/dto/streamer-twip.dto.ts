import { ApiProperty } from '@nestjs/swagger';

export class TwipStreamer {
  @ApiProperty({
    description: '스트리머 번호',
    type: Number,
    example: 30904062,
  })
  id: number;

  @ApiProperty({
    description: '스트리머 아이디',
    type: String,
    example: 'saddummy',
  })
  name: string;

  @ApiProperty({
    description: '스트리머 닉네임',
    type: String,
    example: '서새봄냥',
  })
  displayName: string;

  @ApiProperty({
    description: '스트리머 설명 (트윕에서 설정)',
    type: String,
    example: '트윕에서 설정한 설명',
  })
  description: string;

  @ApiProperty({
    description: '스트리머 테마 색상 (트윕에서 설정)',
    type: String,
    example: '#801fe8',
  })
  primaryColor: string;

  @ApiProperty({
    description: '트윕 후원페이지 배경 이미지 URL (트윕에서 설정)',
    type: String,
    example: '//assets.mytwip.net/images/bg/default.jpg',
  })
  backgroundImageUrl: string;

  @ApiProperty({
    description: '트윕 PRO 여부',
    type: Boolean,
    example: true,
  })
  isPro: boolean;

  @ApiProperty({
    description: '스트리머 프로필 이미지 URL',
    type: String,
    example:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/saddummy-profile_image-925b92caa01026ae-300x300.jpeg',
  })
  logoUrl: string;
}

export class TwipMenuEnables {
  @ApiProperty({
    description: '트윕 후원 활성화 여부',
    type: Boolean,
    example: true,
  })
  donate: boolean;

  @ApiProperty({
    description: '트윕 음성 후원 활성화 여부',
    type: Boolean,
    example: false,
  })
  audio: boolean;

  @ApiProperty({
    description: '트윕 영상 후원 활성화 여부',
    type: Boolean,
    example: true,
  })
  media: boolean;

  @ApiProperty({
    description: '트윕 미션 후원 활성화 여부',
    type: Boolean,
    example: true,
  })
  mission: boolean;

  @ApiProperty({
    description: '트윕 파티 후원 활성화 여부',
    type: Boolean,
    example: true,
  })
  party: boolean;

  @ApiProperty({
    description: '트윕 포인트 활성화 여부',
    type: Boolean,
    example: false,
  })
  point: boolean;

  @ApiProperty({
    description: '트윕 슬롯머신 활성화 여부',
    type: Boolean,
    example: false,
  })
  slot: boolean;

  @ApiProperty({
    description: '트윕 마켓 후원 활성화 여부',
    type: Boolean,
    example: false,
  })
  market: boolean;
}

export class TwipDonateInfo {
  @ApiProperty({
    description: '후원 팔로우 제한',
    type: Boolean,
    example: false,
  })
  isFollowOnly: boolean;

  @ApiProperty({
    description: '후원 최소 금액',
    type: Number,
    example: 1000,
  })
  minimumCash: number;

  @ApiProperty({
    description: '제안하는 캐시',
    type: Number,
    example: 1000,
  })
  placeholderCash: number;

  @ApiProperty({
    description: '후원 닉네임 고정 여부',
    type: Boolean,
    example: false,
  })
  isStrictName: boolean;

  @ApiProperty({
    description: '시청자 이미지팩 허용 여부',
    type: Boolean,
    example: true,
  })
  isAllowWatcherImage: boolean;

  @ApiProperty({
    description: '최대 메세지 길이',
    type: Number,
    example: 120,
  })
  maximumMessageLength: number;

  @ApiProperty({
    description:
      '후원 금액별 글자수 설정 (0일 경우 미설정 상태, 설명 : https://support.twip.kr/hc/ko/articles/900001201266)',
    type: Number,
    example: 0,
  })
  messageLengthLevel: number;
}

export class TwipCustomDonateImage {
  @ApiProperty({
    description: '후원 이미지 ID',
    oneOf: [
      {
        type: 'number',
      },
      {
        type: 'string',
      },
    ],
    example: '6291',
  })
  id: number | string;

  @ApiProperty({
    description: '후원 이미지 이름',
    type: String,
    example: '호에엥',
  })
  title: string;

  @ApiProperty({
    description: '후원 이미지 URL',
    type: String,
    example:
      '//upload.mytwip.net/user_assets/30904062/1b35c6513f5870577ff72e5991eccde8.png',
  })
  thumbnailUrl: string;

  @ApiProperty({
    description: '후원 이미지 타입',
    type: Number,
    example: 'streamer',
  })
  type: string;
}

export class StreamerTwipDto {
  @ApiProperty({
    description: '스트리머 정보',
  })
  streamer: TwipStreamer;

  @ApiProperty({
    description: '트윕 메뉴별 활성화 여부',
  })
  menuEnables: TwipMenuEnables;

  @ApiProperty({
    description: '트윕 포인트 이름',
    nullable: true,
    example: null,
  })
  pointName: string;

  @ApiProperty({
    description: '트윕 후원 규칙',
  })
  donateInfo: TwipDonateInfo;

  @ApiProperty({
    description:
      '스트리머 후원 이미지 (트윕 PRO 이용시에 설정 가능, 없을 경우 : 빈 배열 반환)',
    type: TwipCustomDonateImage,
    isArray: true,
  })
  customDonateImages: TwipCustomDonateImage[];
}
