import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StreamerService } from 'src/streamer/streamer.service';
import { TwitchService } from 'src/streamer/twitch.service';
import { LinkMatch } from './entities/link-match.entity';
import { Link } from './entities/link.entity';
import { User } from './entities/user.entity';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [SequelizeModule.forFeature([Link, LinkMatch, User])],
  controllers: [LinkController],
  providers: [LinkService, StreamerService, TwitchService],
})
export class LinkModule {}
