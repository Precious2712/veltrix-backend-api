
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePinDto {

    @IsString()
    @MinLength(4)
    @MaxLength(4)
    @Matches(/^\d{4}$/, {
        message: 'Transaction PIN must contain exactly 4 digits',
    })
    pin: string;
}
