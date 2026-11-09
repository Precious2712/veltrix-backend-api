import {
    Controller,
    Post,
    Body,
    HttpCode,
    Get,
} from '@nestjs/common';

import {
    CurrentUser,
    Public,
} from '@nestjs/authentication';

import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/auth.dto.js';
import { User } from '../users/schema/users-schema.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @Post('sign-in')
    @HttpCode(200)
    async signIn(@Body() body: SignInDto) {
        return this.authService.signIn(body);
    }

    @Post('sign-out')
    @HttpCode(200)
    async signOut() {
        return this.authService.signOut();
    }

    @Get('me')
    getCurrentUser(@CurrentUser() user: User) {
        return user;
    }

    @Public()
    @Post('refresh')
    @HttpCode(200)
    refresh(@Body('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }
}