
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminService } from './admin.service.js';
import { AdminController } from './admin.controller.js';

import {
  Admin,
  AdminSchema,
} from './schema/admin-schemas.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],

  controllers: [
    AdminController
  ],

  providers: [
    AdminService
  ],
  
  exports: [
    AdminService

  ],
})

export class AdminModule { }
