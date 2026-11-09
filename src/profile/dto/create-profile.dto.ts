
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    Matches,
    MinLength,
    MaxLength,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class CreateProfileDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    lastname: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    middlename?: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    country: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    state: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    occupation: string;

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^\d+\s+[a-zA-Z][a-zA-Z\s.'-]*,\s*[a-zA-Z][a-zA-Z\s'-]*$/,
        {
            message:
                'Address must follow this format: House Number, Street Name, State (e.g. 12 Allen Avenue, Ikeja, Lagos)',
        },
    )
    address: string;
}
