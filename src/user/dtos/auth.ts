import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsEnum, IsOptional } from 'class-validator';
import { UserType } from '../../../enums/userType';

export class SignUpDto{

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    {message: 'phone must be a valid phone number'})
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsOptional()
  @IsString()
  productKey?: string
}

export class signInDto{
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(5)
  password: string;

}


export class GenereteProductKeyDto{
  @IsEmail()
  email: string;

  @IsEnum(UserType)
  userType:UserType
}