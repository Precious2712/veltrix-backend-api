
import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';

import type { User } from '../../users/schema/users-schema.js';

@Controller('me')
export class MeController {
    @Get()
    me(@CurrentUser() user: User) {
        return user;
    }
}