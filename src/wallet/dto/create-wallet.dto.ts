
import {
    IsOptional,
    IsString,
    IsIn,
} from 'class-validator';

export class CreateWalletDto {

    @IsOptional()
    @IsString()
    @IsIn(['platform'])
    walletType?: string;

    @IsOptional()
    @IsString()
    @IsIn(['NGN'])
    currency?: string;
}
