import { ApiProperty } from '@nestjs/swagger';

export interface StreamerSearchDto {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name: string;
  game_id: string;
  game_name: string;
  id: string;
  is_live: boolean;
  tag_ids: string[];
  thumbnail_url: string;
  title: string;
  started_at: string;
}

export class StreamerSearchLiveDto implements StreamerSearchDto {
  @ApiProperty({
    description: '방송 언어',
    type: String,
    example: 'ko',
  })
  broadcaster_language: string;

  @ApiProperty({
    description: '스트리머 아이디',
    type: String,
    example: 'seju22',
  })
  broadcaster_login: string;

  @ApiProperty({
    description: '스트리머 닉네임',
    type: String,
    example: '도연',
  })
  display_name: string;

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
    description: '스트리머 번호',
    type: String,
    example: '188643459',
  })
  id: string;

  @ApiProperty({
    description: '생방송 여부',
    type: Boolean,
    example: true,
  })
  is_live: boolean;

  @ApiProperty({
    description: '방송 태그 (방송 Off시 빈 배열 반환)',
    type: [String],
    example: ['6ea6bca4-4712-4ab9-a906-e3336a9d8039'],
  })
  tag_ids: string[];

  @ApiProperty({
    description: '스트리머 프로필 이미지',
    type: String,
    example:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/3d68603f-5db3-4850-af4d-e4bde3feb260-profile_image-300x300.png',
  })
  thumbnail_url: string;

  @ApiProperty({
    description: '방송 제목',
    type: String,
    example: '[V] 주말에도 코딩하는 도연',
  })
  title: string;

  @ApiProperty({
    description: '방송 시작 시간',
    type: String,
    example: '2021-03-27T07:00:00Z',
  })
  started_at: string;
}

export class StreamerSearchNotLiveDto {
  @ApiProperty({
    description: '방송 언어',
    type: String,
    example: 'ko',
  })
  broadcaster_language: string;

  @ApiProperty({
    description: '스트리머 아이디',
    type: String,
    example: 'seju22',
  })
  broadcaster_login: string;

  @ApiProperty({
    description: '스트리머 닉네임',
    type: String,
    example: '도연',
  })
  display_name: string;

  @ApiProperty({
    description: '게임 아이디',
    type: String,
    example: '0',
  })
  game_id: string;

  @ApiProperty({
    description: '게임 이름',
    type: String,
    example: '',
  })
  game_name: string;

  @ApiProperty({
    description: '스트리머 번호',
    type: String,
    example: '188643459',
  })
  id: string;

  @ApiProperty({
    description: '생방송 여부',
    type: Boolean,
    example: false,
  })
  is_live: boolean;

  @ApiProperty({
    description: '방송 태그 (방송 Off시 빈 배열 반환)',
    type: [String],
    example: [],
  })
  tag_ids: string[];

  @ApiProperty({
    description: '스트리머 프로필 이미지',
    type: String,
    example:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/3d68603f-5db3-4850-af4d-e4bde3feb260-profile_image-300x300.png',
  })
  thumbnail_url: string;

  @ApiProperty({
    description: '방송 제목',
    type: String,
    example: '[V] 주말에도 코딩하는 도연',
  })
  title: string;

  @ApiProperty({
    description: '방송 시작 시간',
    type: String,
    example: '2021-03-27T07:00:00Z',
  })
  started_at: string;
}
