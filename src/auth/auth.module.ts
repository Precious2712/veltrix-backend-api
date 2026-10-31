
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { SessionAuth } from './session-auth.js';

import { UsersModule } from '../users/users.module.js';

@Module({
    imports: [
        UsersModule,
    ],

    controllers: [
        AuthController,
    ],

    providers: [
        AuthService,
        SessionAuth,
    ],

    exports: [
        AuthService,
    ],
})

export class AuthModule { }
