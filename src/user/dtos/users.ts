import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';


export class CreateUserDTO{

  @IsString()
  @IsNotEmpty()
  name:string;

  @IsString()
  @IsNotEmpty()
  family:string;

  @IsNumber()
  @IsNotEmpty()
  age:number
}


export class FindUserDTO{
  @IsString()
  @IsNotEmpty()
  name:string;
}




