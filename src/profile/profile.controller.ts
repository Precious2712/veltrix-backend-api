
import {
    Controller,
    Post,
    Body,
    Get,
    Query,
} from '@nestjs/common';

import { ProfileService } from './profile.service.js';
import { CreateProfileDto } from './dto/create-profile.dto.js';

import { CurrentUser, Public } from '@nestjs/authentication';
import type { User, UserDocument } from '../users/schema/users-schema.js'
import type { AuthenticatedUser } from '../users/schema/users-schema.js';
import { Types } from 'mongoose';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
    ) { }

    @Post('create')
    async createProfile(
        @CurrentUser() user: UserDocument,
        @Body() bioData: CreateProfileDto,
    ) {
        return this.profileService.userProfile(
            user._id,
            user.veltrixId,
            bioData
        );
    }

    @Get('user')
    async getUserProfile(
        @CurrentUser() user: AuthenticatedUser,
    ) {
        return this.profileService.getUserProfileId(
            user._id,
        );
    }

}
