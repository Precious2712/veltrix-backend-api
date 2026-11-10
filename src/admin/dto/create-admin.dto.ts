import {
    IsEmail,
    IsString,
    Matches,
    MinLength,
    MaxLength,
} from 'class-validator';



export class CreateAdminDto {
    @IsEmail({}, {
        message: 'Please provide a valid email address',
    })
    email: string;
    

    @IsString()
    @MinLength(8, {
        message: 'Password must be at least 8 characters long',
    })
    @MaxLength(64, {
        message: 'Password cannot exceed 64 characters',
    })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
            message:
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
    )
    password: string;
};