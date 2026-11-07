import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Network {
    MTN = 'MTN',
    AIRTEL = 'AIRTEL',
    GLO = 'GLO',
    NINE_MOBILE = '9MOBILE',
}

export enum PurchaseType {
    AIRTIME = 'AIRTIME',
    DATA = 'DATA',
}

export enum DataCategory {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
}

@Schema({ timestamps: true })
export class TopUp {

    @Prop({
        required: true,
        enum: Object.values(Network),
    })
    network: Network;

    @Prop({
        required: true,
        enum: Object.values(PurchaseType),
    })
    type: PurchaseType;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    amount: number;

    @Prop({
        enum: Object.values(DataCategory),
        required: function (this: TopUp) {
            return this.type === PurchaseType.DATA;
        },
    })
    category?: DataCategory;

    @Prop({
        required: function (this: TopUp) {
            return this.type === PurchaseType.DATA;
        },
    })
    dataValue?: string;

    @Prop({ required: true })
    price: number;
}

export const TopUpSchema =
    SchemaFactory.createForClass(TopUp);