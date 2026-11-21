
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TransactionPinDocument =
    HydratedDocument<TransactionPin>;

@Schema({ timestamps: true })
export class TransactionPin {

    @Prop({
        required: true,
        select: false,
    })
    pin: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    })
    userId: Types.ObjectId;
}

export const TransactionPinSchema =
    SchemaFactory.createForClass(TransactionPin);
