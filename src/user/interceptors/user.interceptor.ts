import { CallHandler, ExecutionContext, HttpException, NestInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';


export class UserInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext, handler: CallHandler,
  ) {
    const request = context.switchToHttp().getRequest();
    // const token = request?.rawHeaders[request.rawHeaders.length-1]?.split('token=')[1];
    const token = request?.headers?.authorization?.split('Bearer ')[1];
    if (token) {
      const user = await jwt.decode(token);
      request.user = user;
    }
    return handler.handle();
  }

}