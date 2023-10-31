import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './utils/google-strategy';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ControllersController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
