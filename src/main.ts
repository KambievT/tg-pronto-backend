import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка CORS
  app.enableCors({
    origin: [
      'https://telegram-pronto-bot.vercel.app',
      'http://localhost:3000',
      'https://web.telegram.org',
      'https://telegram.org',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 3600,
  });

  const port = parseInt(process.env.PORT, 10) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server is listening on http://0.0.0.0:${port}`);
}

bootstrap();
