import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-users.dto.js';

export class UpdateNenjasDto extends PartialType(CreateUserDto) {};