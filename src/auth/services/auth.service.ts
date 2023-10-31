import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Auth } from 'googleapis';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
  // TODO: Type the parameter oauth2GoogleClient - DONE
  async getTokens({
    code,
    oauth2GoogleClient,
  }: {
    code: string;
    oauth2GoogleClient: Auth.OAuth2Client;
  }) {
    try {
      const { tokens } = await oauth2GoogleClient.getToken(code);

      return { tokens };
    } catch (err) {
      console.error(err);
    }
  }
}
