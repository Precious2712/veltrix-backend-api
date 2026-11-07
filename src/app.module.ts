
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '@nestjs/authentication';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { VtuagentModule } from './vtuagent/vtuagent.module.js';
import { WalletModule } from './wallet/wallet.module.js';
import { ProfileModule } from './profile/profile.module.js';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGO_URI'),
      }),
    }),

    AuthenticationModule.forRoot({
      session: {
        absoluteTtl: '14d',
        idleTtl: '3d',
      },
    }),

    UsersModule,
    AuthModule,
    VtuagentModule,
    WalletModule,
    ProfileModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { };
