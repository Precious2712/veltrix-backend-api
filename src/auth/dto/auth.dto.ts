
import {
    IsNotEmpty,
    IsString,
    MinLength,
    Matches,
} from 'class-validator';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    veltrixId!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^\d+$/, {
        message: 'Password must contain numbers only',
    })
    password!: string;
}
