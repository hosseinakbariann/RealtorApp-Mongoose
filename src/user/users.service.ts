import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Users } from '../../interfaces/users.interface';
import { CreateUserDTO } from './dtos/users';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<Users>,
  ) {
  }

  async create(createUserDto: CreateUserDTO): Promise<Users> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getUser(name) {
    const user = await this.userModel.find({ name: name });
    if(!user[0])throw new NotFoundException(404);
    return {
      _id: (user[0]._id).toString(),
      name: user[0].name,
      userType: user[0].user_type
    }
  }
}
