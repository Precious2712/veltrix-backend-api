
import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { SignInService } from '@nestjs/authentication';

import { UsersService } from '../users/users.service.js';
import { SignInDto } from './dto/auth.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly signInService: SignInService,
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

        const { session } = await this.signInService.signIn(
            user.id,
            { method: 'password' },
        );

        return {
            veltrixId: user.veltrixId,
            profileCompleted: user.profileCompleted,
            mfaRequired: session.mfa === 'pending',
            identifierId: user.id
        };
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
}
