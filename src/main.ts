import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();

/*
2WY57PfnMpcdVUIi
mongodb+srv://always_dev:2WY57PfnMpcdVUIi@googleauth.rbfubgy.mongodb.net/googleauth
*/
