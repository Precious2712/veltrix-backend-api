
import {
    IsNotEmpty,
    IsString,
    MinLength,
    Matches,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @Matches(/^\d+$/, {
        message: 'Password must contain numbers only',
    })
    password!: string;
}
