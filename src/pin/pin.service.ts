import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { TransactionPin } from './schema/pin-schema.js';
import { CreatePinDto } from './dto/create-pin.dto.js';

import { PasswordHasher } from '@nestjs/authentication';

@Injectable()
export class PinService {
    constructor(
        @InjectModel(TransactionPin.name)
        private readonly pinModel: Model<TransactionPin>,

        private readonly passwordHasher: PasswordHasher,
    ) { }

    async create(
        userId: Types.ObjectId,
        dto: CreatePinDto,
    ) {
        try {
            const existingPin = await this.pinModel.findOne({ userId });

            if (existingPin) {
                throw new ConflictException(
                    'You have already created a transaction PIN',
                );
            }

            const pinHash = await this.passwordHasher.hash(dto.pin);

            const transactionPin = await this.pinModel.create({
                userId,
                pin: pinHash,
            });

            console.log('Creating PIN for user:', userId);
            console.log('PIN created:', transactionPin._id);

            return {
                message: 'Transaction PIN created successfully',
                userId: transactionPin.userId,
            };

        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }

            throw new InternalServerErrorException(
                'Unable to create transaction PIN',
            );
        }
    }

    async verify(
        userId: Types.ObjectId,
        pin: string,
    ): Promise<void> {
        const transactionPin = await this.pinModel
            .findOne({ userId })
            .select('+pin');

        if (!transactionPin) {
            throw new UnauthorizedException(
                'Transaction PIN has not been created',
            );
        }

        const isValid = await this.passwordHasher.verify(
            pin,
            transactionPin.pin,
        );

        console.log('Creating PIN for user:', userId);
        console.log('PIN created:', transactionPin._id);

        if (!isValid) {
            throw new UnauthorizedException(
                'Invalid transaction PIN',
            );
        }
    }

}