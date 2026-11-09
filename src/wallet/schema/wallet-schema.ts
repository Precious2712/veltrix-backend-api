
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {

    @Prop({
        required: true,
        unique: true,
        default: 'platform',
    })
    walletType: string;

    @Prop({
        type: Number,
        default: 0,
        min: 0,
    })
    balance: number;

    @Prop({
        type: Number,
        default: 0,
        min: 0,
    })
    expenses: number;

    @Prop({
        type: Number,
        default: 0,
        min: 0,
    })
    profit: number;

    @Prop({
        type: Number,
        default: 0,
        min: 0,
    })
    totalFunded: number;

    @Prop({
        default: 'NGN',
        enum: ['NGN'],
    })
    currency: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
