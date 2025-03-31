import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { ValidationPipe,BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException(errors.map((err) => Object.values(err.constraints || {})).flat()),
    }),
  );

  // Use custom exception filter
  app.useGlobalFilters(new ValidationExceptionFilter());
  
  app.enableCors({
    origin: '*', // Allow all origins (change as needed)
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS', // Allow these HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow only valid request headers
    credentials: true, // Enable credentials if needed
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
