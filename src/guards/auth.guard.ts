import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private configService: ConfigService) {
  }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (roles.length) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers?.authorization?.split('Bearer ')[1];
      try {
        const user = await jwt.verify(token, this.configService.get<string>('SIGNUP_KEY_SECRET'));
        // @ts-ignore
        if(roles.includes(user.userType)) return true;
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }

}