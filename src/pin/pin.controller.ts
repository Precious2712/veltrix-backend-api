import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';

import { PinService } from './pin.service.js';
import { CreatePinDto } from './dto/create-pin.dto.js';

import { CurrentUser } from '@nestjs/authentication';

import type { User } from '../users/schema/users-schema.js';

import { Types } from 'mongoose';

@Controller('pin')
export class PinController {
    constructor(
        private readonly pinService: PinService,
    ) { }

    @Post('transaction-pin')
    async create(
        @CurrentUser() user: User & { _id: Types.ObjectId },
        @Body() dto: CreatePinDto,
    ) {
        return this.pinService.create(user._id, dto);
    }
}