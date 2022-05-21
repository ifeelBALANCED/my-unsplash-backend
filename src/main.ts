import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(AppModule.port);
}

bootstrap();
