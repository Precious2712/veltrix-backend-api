import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export type AuthenticatedUser = {
  _id: Types.ObjectId;
  veltrixId: string;
  profileCompleted: boolean;
};


@Schema({ timestamps: true })
export class User {

  @Prop({ required: true, unique: true })
  veltrixId: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: false })
  profileCompleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);