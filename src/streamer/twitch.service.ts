import { InjectRedis } from '@nestjs-modules/ioredis';
import axios from 'axios';
import Redis from 'ioredis';

export class TwitchService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async getAppAccessToken(): Promise<string> {
    const cacheKey = 'partyview:twitch:access_token';
    const cacheValue = await this.redisClient.get(cacheKey);
    if (cacheValue) {
      return cacheValue;
    }

    const response = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    await this.redisClient.set(
      cacheKey,
      response.data.access_token,
      'EX',
      60 * 60 * 2,
    );
    return response.data.access_token;
  }
}
