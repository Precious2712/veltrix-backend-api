
import {
    Injectable,
    BadRequestException,
    Inject
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
                    userId
                });

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
}
