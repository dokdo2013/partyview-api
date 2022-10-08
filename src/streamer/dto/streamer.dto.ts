import { ApiProperty } from '@nestjs/swagger';

export class StreamerDto {
  @ApiProperty({
    description: '스트리머 번호',
    type: String,
    example: '148580412',
  })
  id: string;

  @ApiProperty({
    description: '스트리머 아이디',
    type: String,
    example: 'ssakdook',
  })
  login: string;

  @ApiProperty({
    description: '스트리머 닉네임',
    type: String,
    example: '싹둑',
  })
  display_name: string;

  @ApiProperty({
    description: '타입',
    type: String,
    example: '',
  })
  type: string;

  @ApiProperty({
    description: '스트리머 타입 (제휴 : affiliate, 파트너 : partner)',
    type: String,
    example: 'partner',
  })
  broadcaster_type: string;

  @ApiProperty({
    description: '방송국 설명',
    type: String,
    example:
      '트위치 채팅 관리 및 로그 저장 등의 기능을 제공하는 봇입니다. Powered by Twip',
  })
  description: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    type: String,
    example:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/ssakdook-profile_image-4bf90a35a6bd1287-300x300.png',
  })
  profile_image_url: string;

  @ApiProperty({
    description: '방송국 오프라인 이미지 URL',
    type: String,
    example: '',
  })
  offline_image_url: string;

  @ApiProperty({
    description: '방송국 뷰 카운트',
    type: Number,
    example: 233247,
  })
  view_count: number;

  @ApiProperty({
    description: '계정 생성일시',
    type: String,
    example: '2017-02-24T10:08:07Z',
  })
  created_at: string;
}
