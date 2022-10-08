import { InjectRedis } from '@nestjs-modules/ioredis';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import Redis from 'ioredis';
import { StreamerSearchDto } from './dto/streamer-search.dto';
import { TwitchService } from './twitch.service';

export class StreamerService {
  constructor(
    @InjectRedis() private readonly redisClient: Redis,
    private readonly twitchService: TwitchService,
  ) {}

  async search(q: string): Promise<StreamerSearchDto> {
    if (q.length < 2) {
      throw new BadRequestException('검색어는 2글자 이상이어야 합니다.');
    }

    const cacheKey = 'partyview:streamer:search:' + q;
    const cacheValue = await this.redisClient.get(cacheKey);
    if (cacheValue) {
      return JSON.parse(cacheValue);
    }

    const access_token = await this.twitchService.getAppAccessToken();
    const twitchResponse = await axios.get(
      'https://api.twitch.tv/helix/search/channels?query=' +
        encodeURIComponent(q),
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const twitchData = twitchResponse.data?.data;

    await this.redisClient.set(
      cacheKey,
      JSON.stringify(twitchData),
      'EX',
      60 * 60 * 12,
    );
    return twitchData;
  }

  async getStreamerByName(streamerName: string): Promise<any> {
    const cacheKey = 'partyview:streamer:name:' + streamerName;
    const cacheValue = await this.redisClient.get(cacheKey);
    if (cacheValue) {
      return JSON.parse(cacheValue);
    }

    const access_token = await this.twitchService.getAppAccessToken();
    const twitchResponse = await axios.get(
      'https://api.twitch.tv/helix/users?login=' +
        encodeURIComponent(streamerName),
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    const twitchData = twitchResponse.data?.data?.[0];
    if (!twitchData) {
      throw new NotFoundException('스트리머를 찾을 수 없습니다.');
    }

    await this.redisClient.set(
      cacheKey,
      JSON.stringify(twitchData),
      'EX',
      60 * 60 * 24,
    );
    return twitchData;
  }

  async getStreamerByNameLive(streamerName: string): Promise<any> {
    const cacheKey = 'partyview:streamer:live:name:' + streamerName;
    const cacheValue = await this.redisClient.get(cacheKey);
    if (cacheValue && cacheValue !== 'null') {
      return JSON.parse(cacheValue);
    } else if (cacheValue === 'null') {
      throw new BadRequestException('스트리머가 현재 방송 중이지 않습니다');
    }

    const access_token = await this.twitchService.getAppAccessToken();
    const twitchResponse = await axios.get(
      'https://api.twitch.tv/helix/streams?user_login=' +
        encodeURIComponent(streamerName),
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    const twitchData = twitchResponse.data?.data?.[0];
    if (!twitchData) {
      await this.redisClient.set(cacheKey, 'null', 'EX', 60 * 3);
      throw new BadRequestException('스트리머가 현재 방송 중이지 않습니다');
    }

    await this.redisClient.set(
      cacheKey,
      JSON.stringify(twitchData),
      'EX',
      60 * 3,
    );
    return twitchData;
  }

  // FIXME: JSON이 text/html로 리턴되는 현상 수정 필요
  async getStreamerByNameTwip(streamerName: string): Promise<any> {
    const cacheKey = 'partyview:streamer:twip:name:' + streamerName;
    const cacheValue = await this.redisClient.get(cacheKey);
    if (cacheValue) {
      return JSON.parse(cacheValue);
    }

    const twipResponse = await axios
      .get('https://api.twip.kr/user/' + encodeURIComponent(streamerName))
      .then((response) => {
        this.redisClient.set(
          cacheKey,
          JSON.stringify(response.data),
          'EX',
          60 * 60 * 24 * 7,
        );
        return response.data;
      })
      .catch((error) => {
        throw new NotFoundException('해당 스트리머는 Twip 회원이 아닙니다.');
      });

    return twipResponse?.data;
  }

  async getStreamerByNameTgd(streamerName: string): Promise<any> {
    const cacheKey = 'partyview:streamer:tgd:name:' + streamerName;
    const cacheValue = await this.redisClient.get(cacheKey);
    if (cacheValue && cacheValue !== 'null') {
      return JSON.parse(cacheValue);
    } else if (cacheValue === 'null') {
      throw new NotFoundException(
        '해당 스트리머는 트게더 게시판을 보유하고 있지 않습니다.',
      );
    }

    const tgdResponse = await axios
      .get('https://tgd.kr/api/v2/board/' + streamerName)
      .then((response) => {
        if (response.data?.success) {
          this.redisClient.set(
            cacheKey,
            JSON.stringify(response.data?.data),
            'EX',
            60 * 60 * 24 * 30,
          );
          return response.data?.data;
        } else {
          this.redisClient.set(cacheKey, 'null', 'EX', 60 * 60 * 24 * 30);
          throw new NotFoundException(
            '해당 스트리머는 트게더 게시판을 보유하고 있지 않습니다.',
          );
        }
      })
      .catch((error) => {
        this.redisClient.set(cacheKey, 'null', 'EX', 60 * 60 * 24 * 30);
        throw new NotFoundException(
          '해당 스트리머는 트게더 게시판을 보유하고 있지 않습니다.',
        );
      });

    return tgdResponse;
  }

  async getStreamerById(streamerId: number): Promise<any> {
    const cacheKey = 'partyview:streamer:id:' + streamerId;
    const cacheValue = await this.redisClient.get(cacheKey);
    if (cacheValue) {
      return JSON.parse(cacheValue);
    }

    const access_token = await this.twitchService.getAppAccessToken();
    const twitchResponse = await axios.get(
      'https://api.twitch.tv/helix/users?id=' + streamerId,
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    const twitchData = twitchResponse.data?.data?.[0];
    if (!twitchData) {
      throw new NotFoundException('스트리머를 찾을 수 없습니다.');
    }

    await this.redisClient.set(
      cacheKey,
      JSON.stringify(twitchData),
      'EX',
      60 * 60 * 24,
    );
    return twitchData;
  }

  async getStreamerByIdLive(streamerId: number): Promise<any> {
    const cacheKey = 'partyview:streamer:live:id:' + streamerId;
    const cacheValue = await this.redisClient.get(cacheKey);
    if (cacheValue && cacheValue !== 'null') {
      return JSON.parse(cacheValue);
    }

    const access_token = await this.twitchService.getAppAccessToken();
    const twitchResponse = await axios.get(
      'https://api.twitch.tv/helix/streams?user_id=' + streamerId,
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    const twitchData = twitchResponse.data?.data?.[0];
    if (!twitchData) {
      await this.redisClient.set(cacheKey, 'null', 'EX', 60 * 3);
      throw new BadRequestException('스트리머가 현재 방송 중이지 않습니다');
    }

    await this.redisClient.set(
      cacheKey,
      JSON.stringify(twitchData),
      'EX',
      60 * 3,
    );
    return twitchData;
  }
}
