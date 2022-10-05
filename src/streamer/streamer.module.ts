import { Module } from '@nestjs/common';
import { StreamerController } from './streamer.controller';
import { StreamerService } from './streamer.service';
import { TwitchService } from './twitch.service';

@Module({
  imports: [],
  controllers: [StreamerController],
  providers: [StreamerService, TwitchService],
})
export class StreamerModule {}
