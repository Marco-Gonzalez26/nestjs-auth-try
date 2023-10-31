import { google } from 'googleapis';

export const OAuth2Client = new google.auth.OAuth2(
  '504789078000-9srbvjg5etki2v2142s4t1upsgg64n69.apps.googleusercontent.com',
  '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',
  'http://localhost:3001/api/auth/google/redirect',
);

const scopes = [
  'email',
  'profile',
  // ESTO SOLO HABILITA LOS CREADOS POR LA APP
  // 'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.resource',

  // ESTO HABILITA QUE SE PUEDAR VER, CREAR, ACTUALIZAR Y ELIMINAR TODOS LOS ARCHIVOS DEL DRIVE
  // 'https://www.googleapis.com/auth/drive',
];

export const authorizationUrl = OAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});
