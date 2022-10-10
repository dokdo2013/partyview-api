import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Redis from 'ioredis';
import { Sequelize } from 'sequelize-typescript';
import { StreamerDto } from 'src/streamer/dto/streamer.dto';
import { StreamerService } from 'src/streamer/streamer.service';
import {
  CreateLinkDto,
  LinkItemsResponseDto,
  LinkResponseDto,
} from './dto/link.dto';
import {
  LinkMatch,
  LinkMatchCreateAttibutes,
} from './entities/link-match.entity';
import { Link } from './entities/link.entity';
import { User } from './entities/user.entity';

export class LinkService {
  constructor(
    @InjectRedis() private readonly redisClient: Redis,
    @InjectModel(Link) private linkModel: typeof Link,
    @InjectModel(LinkMatch) private linkMatchModel: typeof LinkMatch,
    @InjectModel(User) private userModel: typeof User,
    private readonly sequelize: Sequelize,
    private readonly streamerService: StreamerService,
  ) {
    this.sequelize.addModels([Link, LinkMatch, User]);
  }

  async getLink(key: string): Promise<LinkItemsResponseDto> {
    const cacheKey = `partyview:link:${key}`;
    const cacheValue = await this.redisClient.zrange(cacheKey, 0, -1);
    if (cacheValue.length > 0) {
      const result = await this.getNamesFromIds(cacheValue);
      return {
        items: result,
      };
    }

    const link = await this.linkModel.findOne({
      where: { key },
    });

    if (!link) {
      throw new NotFoundException('존재하지 않는 링크입니다.');
    }

    const linkMatch = await this.linkMatchModel.findAll({
      where: { key },
      attributes: ['userId', 'weight'],
      include: [
        {
          model: this.userModel,
          attributes: ['name'],
        },
      ],
      order: [['weight', 'ASC']],
    });

    return {
      items: linkMatch.map((v) => v.user.name),
    };
  }

  async getLinkWithInfo(key: string): Promise<LinkItemsResponseDto> {
    const cacheKey = `partyview:link:${key}`;
    const cacheValue = await this.redisClient.zrange(cacheKey, 0, -1);
    if (cacheValue.length > 0) {
      const names = await this.getNamesFromIds(cacheValue);
      const result = [];
      for (const name of names) {
        const streamer = await this.streamerService.getStreamerByName(name);
        result.push(streamer);
      }

      // return {
      //   items: result,
      // };
    }

    const link = await this.linkModel.findOne({
      where: { key },
    });

    if (!link) {
      throw new NotFoundException('존재하지 않는 링크입니다.');
    }

    const linkMatch = await this.linkMatchModel.findAll({
      where: { key },
      attributes: ['userId', 'weight'],
      include: [
        {
          model: this.userModel,
          attributes: ['name'],
        },
      ],
      order: [['weight', 'ASC']],
    });

    const result = [];
    for (const item of linkMatch) {
      const name = item.user.name;
      const streamer = await this.streamerService.getStreamerByName(name);
      result.push(streamer);
    }

    return {
      items: result,
    };
  }

  async createLink(
    { items }: CreateLinkDto,
    req,
    ip: string,
  ): Promise<LinkResponseDto> {
    // 1. filter
    if (items.length < 1) {
      throw new UnprocessableEntityException('링크가 제공되지 않았습니다.');
    }
    const itemsSet = new Set();
    for (const item of items) {
      if (itemsSet.has(item)) {
        throw new UnprocessableEntityException('중복된 스트리머가 존재합니다.');
      }
      itemsSet.add(item);
    }

    // 2. 현재 구성 조회
    const linkIds = await this.getIdsFromNames(items);
    const firstCheck = await this.linkMatchModel.findAll({
      where: {
        userId: linkIds[0],
      },
      attributes: ['key'],
      group: ['key'],
    });

    for (const { key: targetKey } of firstCheck) {
      // partyview:link:{key} is sorted set
      const checkCacheKey = `partyview:link:${targetKey}`;
      const checkCache = await this.redisClient.zrange(checkCacheKey, 0, -1);

      if (checkCache.length === items.length) {
        // if every element in checkCache is in links correct order, then return key
        if (checkCache.every((v, i) => v === linkIds[i])) {
          return {
            link: targetKey,
          };
        }
      }
    }

    // 3. key 생성
    let key = this.generateKey();
    let failOver = 0;
    while (await this.checkKey(key)) {
      key = this.generateKey();
      failOver += 1;
      if (failOver > 10) {
        throw new Error('Failed to generate key');
      }
    }

    // 4. key 먼저 link db에 저장
    const linkCreate = {
      key,
      userIp: ip,
      userAgent: req.headers['user-agent'],
    };
    await this.linkModel.create(linkCreate);

    // 5. 현재 구성 link_match db에 저장
    const linkTupleArray = [];

    let weight = 0;

    const linkMatchCreate: LinkMatchCreateAttibutes[] = linkIds.map(
      (userId) => {
        weight += 1;
        linkTupleArray.push({ weight, userId });

        return {
          key,
          userId: parseInt(userId, 10),
          weight,
        };
      },
    );

    // manual insert insted of bulkcreate
    // because bulkcreate doesn't support auto increment
    for (const create of linkMatchCreate) {
      await this.linkMatchModel.create(create);
    }

    // 5. key부터 Redis에 저장
    await this.redisClient.sadd('partyview:link', key);

    // 6. Redis에 현재 구성 저장
    const cacheKey = `partyview:link:${key}`;
    for (const item of linkTupleArray) {
      await this.redisClient.zadd(cacheKey, item.weight, item.userId);
    }

    return {
      link: key,
    };
  }

  generateKey(length = 8): string {
    if (length < 1) {
      length = 8;
    }

    const keyList = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
      key += keyList.charAt(Math.floor(Math.random() * keyList.length));
    }
    return key;
  }

  // FIXME: Redis를 신뢰할 수 없는 상황에서는 이렇게 하면 안됨
  async checkKey(key: string): Promise<boolean> {
    const exists = await this.redisClient.sismember('partyview:link', key);
    return exists === 1;
  }

  async getIdsFromNames(names: string[]): Promise<string[]> {
    const ids = [];
    for (const name of names) {
      let id;
      try {
        id = await this.streamerService.getStreamerByName(name);
      } catch (e) {
        throw new Error(`스트리머 ${name}이 존재하지 않습니다.`);
      }
      ids.push(id.id.toString());
    }
    return ids;
  }

  async getNamesFromIds(ids: string[]): Promise<string[]> {
    const names = [];
    for (const id of ids) {
      let name;
      try {
        name = await this.streamerService.getStreamerById(parseInt(id));
      } catch (e) {
        throw new Error(`스트리머 ${id}이 존재하지 않습니다.`);
      }
      names.push(name.login);
    }
    return names;
  }
}
