import { Module } from '@nestjs/common';
import { VtuagentController } from './vtuagent.controller.js';
import { VtuagentService } from './vtuagent.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { TopUp, TopUpSchema } from './schema/vtuagent.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TopUp.name,
        schema: TopUpSchema
      }
    ]),
  ],

  controllers: [VtuagentController],
  providers: [VtuagentService]
})


export class VtuagentModule { }