import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDTO, UpdateHomeDto } from './dtos/home';
import { PropertyType } from '../../enums/propertyType';
import { User } from '../user/decorators/user.decorator';
import { UserType } from '../../enums/userType';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('home')
export class HomeController {

  constructor(private readonly homeService:HomeService) {}

  @Get()
  getAllHomes(
    @Query('city') city?:string,
    @Query('minPrice') minPrice?:string,
    @Query('maxPrice') maxPrice?:string,
    @Query('propertyType') propertyType?: PropertyType
  ){
    const price = minPrice || maxPrice?{
      ...(minPrice && {"$gte":parseFloat(minPrice)}),
      ...(maxPrice && {"$lte":parseFloat(maxPrice)})
    }:undefined;
    const filer = {
      ...(city && {city}),
      ...(price)&&{price},
      ...(propertyType)&&{propertyType},
    };
    return this.homeService.getAllHomes(filer);
  }


  @Get(':id')
  geHomeById(
    @Param('id') id:string
  ){
    return this.homeService.getHomeById(id);
  }

  @UseGuards(AuthGuard)
  @Roles(UserType.REALTOR,UserType.ADMIN)
  @Post()
  createHome(@Body() body:CreateHomeDTO, @User() user){
    return this.homeService.createHome(body,user.id);
  }

  @UseGuards(AuthGuard)
  @Roles(UserType.REALTOR,UserType.ADMIN)
  @Put(':id')
  updateHome(
    @Param('id') id:string,
    @Body() body: UpdateHomeDto,
    @User() user
  ){
    return this.homeService.updateHome(id,body,user.id);
  }

  @UseGuards(AuthGuard)
  @Roles(UserType.REALTOR,UserType.ADMIN)
  @Delete(':id')
  deleteHome(
    @Param('id') id:string,
    @User() user
  ){
    return this.homeService.deleteHome(id,user.id);
  }
}
