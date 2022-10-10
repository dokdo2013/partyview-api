import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LinkModule } from './link/link.module';
import { StreamerModule } from './streamer/streamer.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sampleRate: 1.0,
  });

  const config = new DocumentBuilder()
    .setTitle('Partyview API')
    .setDescription(
      '합동방송을 간편하게 즐길 수 있는 Partyview 서비스를 위한 API',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [StreamerModule, LinkModule],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(7812);
}
bootstrap();
