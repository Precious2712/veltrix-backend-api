
import {
    Injectable,
    BadRequestException,
} from '@nestjs/common';

import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Profile } from './schema/create-profile-schema.js';
import { CreateProfileDto } from './dto/create-profile.dto.js';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile.name)
        private readonly profileModel: Model<Profile>,
    ) {}

    async userProfile(
        userId: Types.ObjectId,
        bioData: CreateProfileDto,
    ) {
        const {
            firstname,
            lastname,
            middlename,
            country,
            state,
            occupation,
            address,
        } = bioData;

        if (
            !firstname ||
            !lastname ||
            !country ||
            !state ||
            !occupation ||
            !address
        ) {
            throw new BadRequestException('All fields are required');
        }

        const biography = await this.profileModel.create({
            userId,
            firstname,
            lastname,
            middlename,
            country,
            state,
            occupation,
            address,
        });

        return biography;
    }
}
