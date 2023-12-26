import { ConflictException, NotFoundException,HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Users } from '../../../interfaces/users.interface';
import { SignUpDto, signInDto,GenereteProductKeyDto } from '../dtos/auth';
import { UserType } from '../../../enums/userType';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<Users>,
    private configService: ConfigService
  ) {
  }

  async signUp({ name, phone, email, password }: SignUpDto,userType:UserType) {
    const user = await this.userModel.find({ email: email });
    if (user[0]) throw new ConflictException('user exist', 'Your Email has been existed in in our database');
    let hashedPassword = await bcrypt.hash(password, 10);
    let createData = {
      name,
      phone,
      email,
      password: hashedPassword,
      user_type: userType,
    };
    await this.userModel.updateOne({email:email}, {$set: createData}, {upsert: true});
    return {
      message:"you are SiginedUp Successfully",
      code:200
    };
  }

  async signIn({ username, password}: signInDto ) {
    const user = await this.userModel.find({ email: username });
    if (!user[0]) throw new HttpException('Invalid Credential', 400);
    const hashedPassword = user[0].password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if(!isValidPassword) throw new HttpException('Invalid Credential', 400);
    return this.generateJWT(user[0].name, username,user[0]._id,user[0].user_type);
  }

  private async generateJWT(name:string, email:string,id: string,user_type:string) {
    const token = await jwt.sign({
      name: name,
      email: email,
      id:id,
      userType:user_type
    }, this.configService.get<string>('SIGNUP_KEY_SECRET'), {
      expiresIn: 3600,
    });
    return token;
  }

  generateProductKey(email:string,userType:string) {
    const string = `${email}-${userType}-${this.configService.get<string>('PRODUCT_KEY_SECRET')}`;
    return bcrypt.hash(string, 10);
  }

}
