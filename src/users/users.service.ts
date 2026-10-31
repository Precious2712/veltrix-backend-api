
import {
    Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomInt } from 'node:crypto';

import { PasswordHasher } from '@nestjs/authentication';

import { User } from './schema/users-schema.js';
import { CreateUserDto } from './dto/create-users.dto.js';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,

        private readonly passwordHasher: PasswordHasher,
    ) { }

    private async generateVeltrixId(): Promise<string> {
        let veltrixId: string;
        let existingUser: User | null;

        do {
            const number = randomInt(10_000_000, 100_000_000);

            veltrixId = `VLX-${number}`;

            existingUser = await this.userModel
                .findOne({ veltrixId })
                .exec();

        } while (existingUser);

        return veltrixId;
    }

    async register(createUserDto: CreateUserDto) {
        const veltrixId = await this.generateVeltrixId();

        const passwordHash = await this.passwordHasher.hash(
            createUserDto.password,
        );

        const user = await this.userModel.create({
            veltrixId,
            passwordHash,
            profileCompleted: false,
        });

        return {
            veltrixId: user.veltrixId,
            profileCompleted: user.profileCompleted,
        };
    }


    async verifyCredentials(veltrixId: string, password: string) {
        const user = await this.userModel
            .findOne({ veltrixId })
            .exec();

        const isValid = await this.passwordHasher.verify(
            password,
            user?.passwordHash,
        );

        if (!user || !isValid) {
            return null;
        }


        if (this.passwordHasher.needsRehash(user.passwordHash)) {
            user.passwordHash = await this.passwordHasher.hash(password);
            await user.save();
        }


        return {
            id: user._id.toString(),
            veltrixId: user.veltrixId,
            profileCompleted: user.profileCompleted,
        };
    }

    async findById(userId: string) {
        const user = await this.userModel
            .findById(userId)
            .select('-passwordHash')
            .exec();

        return user;
    }
}


