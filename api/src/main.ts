import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import * as cookieParser from 'cookie-parser';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { AppModule } from './app.module';

const ABOUT = {
  title: 'Med App API',
  description: 'API do aplicativo de estudos de medicina Med App',
  version: '1.0',
  author: '@devlulcas',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(ABOUT.title)
    .setDescription(ABOUT.description)
    .setVersion(ABOUT.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/api/reference',
    apiReference({
      baseServerURL: process.env.API_URL,
      darkMode: true,
      theme: 'kepler',
      showSidebar: true,
      searchHotKey: 'k',
      layout: 'modern',
      authentication: {
        http: {
          basic: null,
          bearer: {
            token: '',
          },
        },
      },
      metaData: {
        title: ABOUT.title,
        description: ABOUT.description,
        author: ABOUT.author,
      },
      spec: {
        content: document,
      },
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
