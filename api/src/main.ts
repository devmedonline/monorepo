import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .setTitle('Docs Med App')
    .setDescription(
      'Mep App API é a API que nutre o aplicativo de estudos de medicina Med App',
    )
    .setVersion('1.0')
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
      layout: 'classic',
      hideModels: true,
      metaData: {
        title: 'Docs Med App',
        description: 'A descrição da API do Med App',
        author: '@devlulcas',
      },
      spec: {
        content: document,
      },
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
