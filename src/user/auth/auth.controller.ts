import { Controller, Post, Body, Param, ParseEnumPipe, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto, SignUpDto,GenereteProductKeyDto } from '../dtos/auth';
import { UserType } from '../../../enums/userType';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UserInfo } from 'os';
import { User } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService, private configService: ConfigService) {}

  @Post('/signup/:userType')
  async signUp(
    @Body() body: SignUpDto,@Param('userType', new ParseEnumPipe(UserType)) userType:UserType
  ){
    if(userType !==UserType.BUYER){
      if(!body.productKey){
        throw new UnauthorizedException()
      }
      const validProductKey = `${body.email}-${userType}-${this.configService.get<string>('PRODUCT_KEY_SECRET')}`;
      const isValidProductKey = await bcrypt.compare(validProductKey,body.productKey);
      if(!isValidProductKey){
        throw new UnauthorizedException()
      }
    }
    return this.authService.signUp(body,userType);
  }

  @Post('/signin')
  async signIn(
    @Body() body: signInDto
  ){
    return this.authService.signIn(body);
  }

  @Post('/key')
  async generateProductKey(
    @Body() {email,userType}: GenereteProductKeyDto
  ){
    return this.authService.generateProductKey(email,userType);
  }


  @Get('/me')
  me(
    @User() user: UserInfo<any>
  ){
    return user;
  }


}
