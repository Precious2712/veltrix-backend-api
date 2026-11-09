
import { Injectable } from '@nestjs/common';
import { AuthenticationRegistry, JwtBearerProvider, type JwtClaims } from '@nestjs/authentication';
import type { User } from '../users/schema/users-schema.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class JwtAuth extends JwtBearerProvider<User> {
    constructor(
        private readonly usersService: UsersService,
        registry: AuthenticationRegistry,
    ) {
        // The key, issuer and audience come from the `accessToken` options.
        super({ realm: 'veltrix' });
        // Second in the chain, after SessionAuth (order 0).
        registry.registerProvider(this, { order: 1 });
    }

    // Called after the signature and claims checked out.
    // Returning null (the user was deleted) rejects the token.
    validate({ sub }: JwtClaims) {
        return sub ? this.usersService.findById(sub) : null;
    }
}
