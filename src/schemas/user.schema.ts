import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User & Document>;

type Integrations = {
  name: string;
  tokens: {
    refresh_token?: string;
    access_token?: string;
    expiry_date?: number;
  };
};
@Schema({ collection: 'users' })
export class User {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  fullname: string;

  @Prop({ type: String, required: false, default: null })
  email: string;

  @Prop({
    type: Types.Array,
    default: [],
    required: false,
  })
  integrations: Integrations[];
  @Prop({
    type: String,
    default: null,
    required: false,
  })
  googleDriveFolderId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
