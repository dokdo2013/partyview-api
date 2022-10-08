import { ApiProperty } from '@nestjs/swagger';

export class StreamerLiveDto {
  @ApiProperty({
    description: '방송 ID',
    type: String,
    example: '39748436839',
  })
  id: string;

  @ApiProperty({
    description: '스트리머 번호',
    type: String,
    example: '102845970',
  })
  user_id: string;

  @ApiProperty({
    description: '스트리머 아이디',
    type: String,
    example: 'kimdoe',
  })
  user_login: string;

  @ApiProperty({
    description: '스트리머 닉네임',
    type: String,
    example: '김도',
  })
  user_name: string;

  @ApiProperty({
    description: '게임 아이디',
    type: String,
    example: '509658',
  })
  game_id: string;

  @ApiProperty({
    description: '게임 이름',
    type: String,
    example: 'Just Chatting',
  })
  game_name: string;

  @ApiProperty({
    description: '방송 타입 (200 응답시 무조건 live)',
    type: String,
    example: 'live',
  })
  type: string;

  @ApiProperty({
    description: '방송 제목',
    type: String,
    example: '중대 발표) 어쩌구 저쩌구',
  })
  title: string;

  @ApiProperty({
    description: '시청자 수',
    type: Number,
    example: 4500,
  })
  viewer_count: number;

  @ApiProperty({
    description: '방송 시작 시간',
    type: String,
    example: '2021-01-01T00:00:00Z',
  })
  started_at: string;

  @ApiProperty({
    description: '방송 언어',
    type: String,
    example: 'ko',
  })
  language: string;

  @ApiProperty({
    description: '방송 URL ({width}와 {height}는 숫자로 대체해야 함)',
    type: String,
    example:
      'https://static-cdn.jtvnw.net/previews-ttv/live_user_kimdoe-{width}x{height}.jpg',
  })
  thumbnail_url: string;

  @ApiProperty({
    description: '방송 태그 (방송 Off시 빈 배열 반환)',
    type: [String],
    example: ['6ea6bca4-4712-4ab9-a906-e3336a9d8039'],
  })
  tag_ids: string[];

  @ApiProperty({
    description:
      '성인인증 필요 여부 (채널 들어갔을 때 "브로드캐스터가 이 채널을 성인 전용으로 표시했습니다."라고 뜨는 경우 true)',
    type: Boolean,
    example: true,
  })
  is_mature: boolean;
}
