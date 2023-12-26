import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO, FindUserDTO } from './dtos/users';
import { UsersService } from './users.service';
import { Users } from '../../interfaces/users.interface';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService:UsersService){}

  @Post('createUser')
  createUser(@Body() {name,family,age}: CreateUserDTO){
    return this.usersService.create({name,family,age});
  }

  @Get('/:name')
  getUser(@Param('name')name:string){
    return this.usersService.getUser(name);
  }
}
