import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/link/entities/user.entity';
import { StreamerController } from './streamer.controller';
import { StreamerService } from './streamer.service';
import { TwitchService } from './twitch.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [StreamerController],
  providers: [StreamerService, TwitchService],
})
export class StreamerModule {}
