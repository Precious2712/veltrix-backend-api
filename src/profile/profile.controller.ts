
import {
    Controller,
    Post,
    Body,
} from '@nestjs/common';

import { ProfileService } from './profile.service.js';
import { CreateProfileDto } from './dto/create-profile.dto.js';

import { CurrentUser } from '@nestjs/authentication';
import type { UserDocument } from '../users/schema/users-schema.js';

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
            bioData,
        );
    }
}
