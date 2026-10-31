
import {
    Controller,
    Post,
    Body,
    HttpCode,
} from '@nestjs/common';

import { Public } from '@nestjs/authentication';

import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/auth.dto.js';

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

    @Public()
    @Post('sign-out')
    @HttpCode(200)
    async signOut() {
        return this.authService.signOut();
    }
}
