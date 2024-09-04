import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketAdapter } from './socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8000;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useWebSocketAdapter(new SocketAdapter(app));
  await app.listen(port, () => {
    console.log(`app start with port ${port}`);
  });
}

bootstrap();
