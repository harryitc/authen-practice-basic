// Root
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// Configs
import { setupSwagger } from '@configs/swagger';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(process.env.DOCUMENT_PATH ?? '_docs', app);

  await app.listen(3000);
}
bootstrap();
