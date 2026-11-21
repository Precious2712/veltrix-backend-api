
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {

    @Prop({ type: String, required: true, unique: true })
    veltrixId: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    })
    userId: Types.ObjectId;

    @Prop({ type: String, required: true, trim: true })
    firstname: string;

    @Prop({ type: String, required: true, trim: true })
    lastname: string;

    @Prop({
        type: String,
        trim: true,
        default: null,
    })
    middlename?: string | null;

    @Prop({ type: String, required: true, trim: true })
    country: string;

    @Prop({ type: String, required: true, trim: true })
    state: string;

    @Prop({ type: String, required: true, trim: true })
    occupation: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        match: /^\d+\s+[a-zA-Z][a-zA-Z\s.,'-]*,\s*[a-zA-Z][a-zA-Z\s'-]*(?:,\s*[a-zA-Z][a-zA-Z\s'-]*){0,2}$/
    })
    address: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
