import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Home } from '../../interfaces/home.interface';
import { Users } from '../../interfaces/users.interface';
import { CreateHomeDTO, HomeReponseDto } from './dtos/home';


@Injectable()
export class HomeService {
  constructor(
    @Inject('HOME_MODEL')
    private homeModel: Model<Home>
  ) {
  }

  async getAllHomes(filer) {
    let homes = await this.homeModel.find(filer);
    if (!homes[0]) throw new NotFoundException(404);
    return homes.map((home) => {
      return {
        address: home.address,
        city: home.city,
        numberOfBedrooms: home.number_of_bedrooms,
        numberOfBathrooms: home.number_of_bathrooms,
        price: home.price,
        propertyType: home.propertyType,
      };
    });
  }

  async getHomeById(id) {
    try {
      let home = await this.homeModel.find({ _id: id });
      return {
        address: home[0].address,
        city: home[0].city,
        numberOfBedrooms: home[0].number_of_bedrooms,
        numberOfBathrooms: home[0].number_of_bathrooms,
        price: home[0].price,
        propertyType: home[0].propertyType,
      };
    } catch (e) {
      throw new NotFoundException('home not found', 'your home does not exist');
    }
  }

  async createHome({ address, number_of_bedrooms, number_of_bathrooms, city,
                     price, land_size, propertyType }: CreateHomeDTO,userId: string)
  {
    const createdHome = {
      address,
      number_of_bedrooms,
      number_of_bathrooms,
      city,
      price,
      land_size,
      propertyType,
      image: [],
      realtor_id: userId,
    };
    await this.homeModel.updateOne({ address: address },
      { $set: createdHome }, { upsert: true });
    return createdHome;

  }


  async updateHome(id, body,userId) {
    try {
      const homeExist = await this.getRealtorHomeById(userId);
      if(!homeExist) throw new HttpException('Invalid Credential', 400);
      await this.homeModel.updateOne({ _id: id },
        { $set: body });
      return {
        message:'successfully updated',
        code:200
      }
    } catch (e) {
      throw new HttpException('Invalid Credential', 400);
    }
  }

  async deleteHome(id,userId) {
    try {
      const homeExist = await this.getRealtorHomeById(userId);
      if(!homeExist) throw new HttpException('Invalid Credential', 400);
      await this.homeModel.deleteOne({ _id: id });
      return {
        message:'Successfully Deleted',
        code:200
      }
    } catch (e) {
      throw new HttpException('Invalid Credential', 400);
    }
  }

  async getRealtorHomeById(id) {
    try {
      let home = await this.homeModel.find({ realtor_id: id });
      if(!home[0]) return false;
      else return true
    } catch (e) {
    }
  }



}
