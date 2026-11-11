import {
    Controller,
    Post
} from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { CreateAdminDto } from './dto/create-admin.dto.js';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) { }

    @Post('create')
    async createAdmin(createAdminDto: CreateAdminDto) {
        return this.adminService.registerAdmin(
            createAdminDto
        )
    }
};
