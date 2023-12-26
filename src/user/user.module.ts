import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule,ConfigModule],
  controllers: [AuthController,UsersController],
  providers: [
    AuthService,
    UsersService,
    ...usersProviders
  ],
  exports:[UsersService]
})
export class UsersModule {}
