import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';

import { Profile, ProfileSchema } from './schema/create-profile-schema.js';
import { User, UserSchema } from '../users/schema/users-schema.js';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Profile.name,
        schema: ProfileSchema,
      },

      {
        name: User.name,
        schema: UserSchema
      },
    ]),
  ],

  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})

export class ProfileModule { }
