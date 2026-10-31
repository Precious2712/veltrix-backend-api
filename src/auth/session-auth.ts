import { Injectable } from '@nestjs/common';

import {
    AuthenticationRegistry,
    SessionCookieProvider,
    type SessionRecord,
} from '@nestjs/authentication';

import { UsersService } from '../users/users.service.js';
import type { User } from '../users/schema/users-schema.js';

@Injectable()
export class SessionAuth extends SessionCookieProvider<User> {
    constructor(
        private readonly usersService: UsersService,
        registry: AuthenticationRegistry,
    ) {
        super();

        registry.registerProvider(this);
    }

    validate(session: SessionRecord) {
        return this.usersService.findById(session.userId);
    }
}