import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@nestjs/authentication';

import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-users.dto.js';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Public()
    @Post('create')
    async create(@Body() body: CreateUserDto) {
        return this.usersService.register(body);
    }
}