
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({
    timestamps: true,
})
export class Admin {
    @Prop({
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        select: false,
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(Admin);
