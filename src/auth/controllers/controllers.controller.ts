import { Controller, Get } from '@nestjs/common';
import { Query, Res } from '@nestjs/common/decorators';
// import { AuthService } from '../services/auth.service';
import { google } from 'googleapis';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { Response } from 'express';
import { OAuth2Client, authorizationUrl } from '../utils/google-auth2-client';

@Controller('auth')
export class ControllersController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private oauth2Client = OAuth2Client;

  @Get('google/login')
  // @UseGuards(GoogleAuthGuard)
  handleLogin(@Res() res: Response) {
    res.writeHead(301, { Location: authorizationUrl }).end((param) => {
      console.log(param);
    });
    res.json({ msg: 'Authentication' });
    return { msg: 'Authentication' };
  }

  @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Query('code') code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    const { email } = await this.oauth2Client.getTokenInfo(tokens.access_token);

    const user = await this.userModel.findOne({ email });
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    // Create Adode folder

    if (user) {
      const googleIntegration = user.integrations.find(
        ({ name }) => name === 'Google',
      );
      this.oauth2Client.setCredentials(googleIntegration.tokens);

      // List created files
      const res = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      });
      const files = res.data.files;
      if (files.length === 0) {
        console.log('No files found.');
        return { msg: 'No files found' };
      }

      return { user: user, files: files };
    } else {
      const createdUser = await this.userModel.create({
        email: 'magp2606@gmail.com',
        fullname: 'Marco González',
        integrations: [
          {
            name: 'Google',
            tokens,
          },
        ],
      });

      const googleCredentials = createdUser.integrations.find(
        ({ name }) => name === 'Google',
      );
      this.oauth2Client.setCredentials(googleCredentials.tokens);

      const adodeFolder = await drive.files.create({
        requestBody: {
          mimeType: 'application/vnd.google-apps.folder',
          name: 'Adode',
        },
      });
      console.log('folderId: ', adodeFolder.data.id);

      // Create file within  Adode folder
      await drive.files.create({
        requestBody: {
          parents: [adodeFolder.data.id],
          name: 'Prueba 1',
          mimeType: 'text/plain',
        },
        media: {
          mimeType: 'text/plain',
          body: 'This is a test',
        },
      });
      createdUser.googleDriveFolderId = adodeFolder.data.id;

      await createdUser.save();

      const res = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      });

      const files = res.data.files.map((file) => {
        return { name: file.name, link: file.webViewLink };
      });
      return {
        createdUser,
        filesOnAdode: files,
      };
    }
  }
}
