
import {
    Injectable,
    BadRequestException,
    Inject,
    NotFoundException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { TopUp, PurchaseType } from './schema/vtuagent.schema.js';
import { CreateVtuAgentDto } from './dto/create-vtuagent.dto.js';

import { PinService } from '../pin/pin.service.js';

@Injectable()
export class VtuagentService {
    constructor(
        @InjectModel(TopUp.name)
        private readonly topUpModel: Model<TopUp>,

        @Inject(PinService)
        private readonly pinService: PinService,
    ) { }

    async processTopUp(
        createVtuAgentDto: CreateVtuAgentDto,
        userId: Types.ObjectId,
    ) {
        const {
            network,
            type,
            phone,
            amount,
            category,
            dataValue,
            price,
            pin,
        } = createVtuAgentDto;


        await this.pinService.verify(userId, pin);

        switch (type) {
            case PurchaseType.AIRTIME: {
                const vendorAirtime = await this.topUpModel.create({
                    network,
                    type,
                    phone,
                    price,
                    amount,
                    userId
                });

                console.log(vendorAirtime);

                return {
                    message: 'Airtime purchase recorded successfully',
                    vendorAirtime,
                };
            }


            case PurchaseType.DATA: {
                const vendorData = await this.topUpModel.create({
                    network,
                    type,
                    phone,
                    category,
                    dataValue,
                    price,
                    userId
                });

                return {
                    message: 'Data purchase recorded successfully',
                    vendorData,
                };
            }

            default:
                throw new BadRequestException('Invalid purchase type');
        }
    }

    async getUserTopUps(userId: Types.ObjectId) {
        const topUps = await this.topUpModel
            .find({ userId })
            .sort({ createdAt: -1 });


        return {
            message: 'User airtime and data retrieved successfully',
            topUps,
        };
    }

    async getUserTopUpById(
        transactionId: string,
        userId: Types.ObjectId,
    ) {
        if (!Types.ObjectId.isValid(transactionId)) {
            throw new BadRequestException('Invalid transaction ID');
        }

        const transaction = await this.topUpModel.findOne({
            _id: new Types.ObjectId(transactionId),
            userId,
        });

        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }

        return {
            message: 'Transaction retrieved successfully',
            transaction,
        };
    }
}
