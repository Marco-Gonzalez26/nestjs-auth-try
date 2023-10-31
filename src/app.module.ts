import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    HttpModule,
    // Do not hard code the database url, is for dev purposes
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'mongo',
      auth: {
        username: 'root',
        password: 'root',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
