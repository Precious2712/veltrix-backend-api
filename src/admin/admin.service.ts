import {
    Injectable,
    BadRequestException
} from '@nestjs/common';

import { Admin } from './schema/admin-schemas.js';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto.js';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name)
        private readonly adminModel: Model<Admin>
    ) { }

    async registerAdmin(adminBioData: CreateAdminDto) {
        const { email, password } = adminBioData;

        if (!email || !password) {
            throw new BadRequestException(
                'All fields are required'
            )
        }

        const adminUser = this.adminModel.create({
            email,
            password
        });

        return {
            message: 'Admin created successfully',
            adminUser
        }
    };
};
