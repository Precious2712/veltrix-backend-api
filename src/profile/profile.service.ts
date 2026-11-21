
import {
    Injectable,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';

import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Profile } from './schema/create-profile-schema.js';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { User } from '../users/schema/users-schema.js';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile.name)
        private readonly profileModel: Model<Profile>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }

    async userProfile(
        userId: Types.ObjectId,
        veltrixId: string,
        bioData: CreateProfileDto,
    ) {
        const existingProfile = await this.profileModel.exists({
            userId,
        });

        if (existingProfile) {
            throw new ConflictException(
                'You have already created your profile',
            );
        }

        await this.userModel.findByIdAndUpdate(
            userId,
            { profileCompleted: true },
        );

        const {
            firstname,
            lastname,
            middlename,
            country,
            state,
            occupation,
            address,
        } = bioData;

        const biography = await this.profileModel.create({
            userId,
            veltrixId,
            firstname,
            lastname,
            middlename,
            country,
            state,
            occupation,
            address,
        });

        return {
            message: 'Profile created successfully',
            profile: biography,
        };
    }
}
