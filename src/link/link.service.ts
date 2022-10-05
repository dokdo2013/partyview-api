import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

export class LinkService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async createLink(streamerId: string): Promise<string> {
    return this.redisClient.get(streamerId);
  }

  async deleteLink(streamerId: string): Promise<string> {
    return this.redisClient.get(streamerId);
  }
}
