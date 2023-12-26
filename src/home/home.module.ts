import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { homeProviders } from './home.providers';
import { DatabaseModule } from '../database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from '../user/user.module';
import { usersProviders } from '../user/users.providers';

@Module({
  imports: [DatabaseModule,UsersModule],
  controllers: [HomeController],
  providers: [
    HomeService,
    ...homeProviders,
    ...usersProviders,
    {
      provide:APP_INTERCEPTOR,
      useClass:ClassSerializerInterceptor
    }
  ]
})
export class HomeModule {}
