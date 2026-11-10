
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {

    @Prop({ required: true, unique: true })
    veltrixId: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ required: true, trim: true })
    firstname: string;

    @Prop({ required: true, trim: true })
    lastname: string;

    @Prop({ trim: true, default: null })
    middlename: string | null;

    @Prop({ required: true, trim: true })
    country: string;

    @Prop({ required: true, trim: true })
    state: string;

    @Prop({ required: true, trim: true })
    occupation: string;

    @Prop({
        required: true,
        trim: true,
        match: /^\d+\s+[a-zA-Z][a-zA-Z\s.,'-]*,\s*[a-zA-Z][a-zA-Z\s'-]*,\s*[a-zA-Z][a-zA-Z\s'-]*$/,
    })
    address: string;

    // @Prop({ default: false })
    // profileCompleted: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
