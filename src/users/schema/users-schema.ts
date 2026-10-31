import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

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