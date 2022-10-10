import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
// import { RavenInterceptor, RavenModule } from 'nest-raven';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiOutputInterceptor } from './common/api-response.interceptor';
import { LinkModule } from './link/link.module';
import { StreamerModule } from './streamer/streamer.module';
// import { ApiOutputInterceptor } from './common/api-response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      timezone: 'Asia/Seoul',
    }),
    RedisModule.forRoot({
      config: {
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      },
    }),
    StreamerModule,
    LinkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiOutputInterceptor,
    },
  ],
})
export class AppModule {}
