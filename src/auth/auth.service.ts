import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import {
    SignInService,
    TokenService,
} from '@nestjs/authentication';

import { UsersService } from '../users/users.service.js';
import { SignInDto } from './dto/auth.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly signInService: SignInService,
        private readonly tokenService: TokenService,
    ) { }

    async signIn(body: SignInDto) {
        const user = await this.usersService.verifyCredentials(
            body.veltrixId,
            body.password,
        );

        if (!user) {
            throw new UnauthorizedException(
                'Invalid Veltrix ID or password',
            );
        }

        return this.tokenService.issue(user.id, {
            method: 'password',
            claims: {
                amr: ['pwd'],
            },
        });
    }

    async signOut() {
        const signedOut = await this.signInService.signOut();

        if (!signedOut) {
            throw new UnauthorizedException('No active session');
        }

        return {
            message: 'Successfully signed out',
        };
    }

    async refreshToken(refreshToken: string) {
        return this.tokenService.refresh(refreshToken);
    }
}