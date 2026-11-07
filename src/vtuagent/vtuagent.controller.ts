import {
    Body,
    Controller,
    Post
} from '@nestjs/common';
import { VtuagentService } from './vtuagent.service.js';
import { CreateVtuAgentDto } from './dto/create-vtuagent.dto.js';
import { Public } from '@nestjs/authentication';


@Controller('vtuagent')
export class VtuagentController {
    constructor(
        private readonly vtuAgentService: VtuagentService
    ) {};
 
    @Public()
    @Post('airtime/purchase')
    async airtimePurchase(@Body() createVtuAgentDto: CreateVtuAgentDto) {
        return this.vtuAgentService.processTopUp(createVtuAgentDto);
    };
};
