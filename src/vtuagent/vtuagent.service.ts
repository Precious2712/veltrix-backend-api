
import { Injectable, BadRequestException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TopUp, PurchaseType } from './schema/vtuagent.schema.js';
import { CreateVtuAgentDto } from './dto/create-vtuagent.dto.js';

@Injectable()
export class VtuagentService {

    constructor(
        @InjectModel(TopUp.name)
        private readonly topUpModel: Model<TopUp>
    ) { }

    async processTopUp(createVtuAgentDto: CreateVtuAgentDto) {

        const {
            network,
            type,
            phone,
            amount,
            category,
            dataValue,
            price
        } = createVtuAgentDto;

        switch (type) {

            case PurchaseType.AIRTIME: {

                const vendorAirtime = await this.topUpModel.create({
                    network,
                    type,
                    phone,
                    amount,
                    price
                });

                console.log('vendor-airtime', vendorAirtime);

                return {
                    message: 'Airtime purchase recorded successfully',
                    vendorAirtime
                };

            }


            case PurchaseType.DATA: {

                const vendorData = await this.topUpModel.create({
                    network,
                    type,
                    phone,
                    category,
                    dataValue,
                    price
                });

                return {
                    message: 'Data purchase recorded successfully',
                    vendorData
                };
            }

            default:
                throw new BadRequestException('Invalid purchase type');
        }
    }
}
