import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptors/user.interceptor';

@Module({
  imports: [DatabaseModule, UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    })],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_INTERCEPTOR,
    useClass: UserInterceptor
  }],
})
export class AppModule {}
