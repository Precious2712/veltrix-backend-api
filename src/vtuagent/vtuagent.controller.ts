import {
    Body,
    Controller,
    Post
} from '@nestjs/common';
import { VtuagentService } from './vtuagent.service.js';
import { CreateVtuAgentDto } from './dto/create-vtuagent.dto.js';
import { CurrentUser, Public } from '@nestjs/authentication';
import { Types } from 'mongoose';
import { User } from '../users/schema/users-schema.js';


@Controller('vtuagent')
export class VtuagentController {
    constructor(
        private readonly vtuAgentService: VtuagentService
    ) { };

    // @Public()
    @Post('purchase')
    async airtimePurchase(
        @Body() createVtuAgentDto: CreateVtuAgentDto,
        @CurrentUser() user: User & { _id: Types.ObjectId },
    ) {
        return this.vtuAgentService.processTopUp(createVtuAgentDto, user._id);
    };
};
