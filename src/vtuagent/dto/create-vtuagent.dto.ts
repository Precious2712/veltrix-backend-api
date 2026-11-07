import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsEnum,
    ValidateIf,
} from 'class-validator';

import {
    Network,
    PurchaseType,
    DataCategory,
} from '../schema/vtuagent.schema.js';


export class CreateVtuAgentDto {

    @IsNotEmpty({
        message: 'Network is required'
    })
    @IsEnum(Network, { message: 'Invalid network selected' })
    network: Network;

    @IsNotEmpty({
        message: 'Purchase type is required'
    })
    @IsEnum(PurchaseType, { message: 'Invalid purchase type selected' })
    type: PurchaseType;

    @IsNotEmpty({
        message: 'Phone is required'
    })
    @IsString({ message: 'Phone must be a string' })
    phone: string;

    @ValidateIf(
        (o: CreateVtuAgentDto) => o.type === PurchaseType.AIRTIME
    )
    @IsNotEmpty({ message: 'Amount is required for airtime purchases' })

    @IsNumber()
    amount?: number;

    @ValidateIf(
        (o: CreateVtuAgentDto) => o.type === PurchaseType.DATA
    )
    @IsNotEmpty({ message: 'Data category is required' })
    @IsEnum(DataCategory)
    category?: DataCategory;

    @ValidateIf(
        (o: CreateVtuAgentDto) => o.type === PurchaseType.DATA
    )
    @IsNotEmpty({ message: 'Data value is required' })
    @IsString()
    dataValue?: string;

    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber()
    price: number;
}