import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';
import { GoogleApis } from 'googleapis';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '504789078000-9srbvjg5etki2v2142s4t1upsgg64n69.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/api/auth/google/redirect',

      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.resource',
      ],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log({ accessToken, refreshToken, profile });
    // this.authService.getRefreshToken({accessToken})
    const googleApis = new GoogleApis();
  }
}
/*
fetch('https://www.googleapis.com/oauth2/v4/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'client_id={your client ID}&client_secret={your client secret}&redirect_uri={your redirect uri}&grant_type=authorization_code&code={retrieved your authorization code}'
});
*/
