import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PinController } from './pin.controller.js';
import { PinService } from './pin.service.js';

import {
  TransactionPin,
  TransactionPinSchema
} from './schema/pin-schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TransactionPin.name,
        schema: TransactionPinSchema,
      },
    ]),
  ],

  controllers: [PinController],

  providers: [PinService],

  exports: [PinService],
})

export class PinModule { }