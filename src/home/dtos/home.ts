import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId, Types } from 'mongoose';
import { PropertyType } from '../../../enums/propertyType';
import {
  IsArray,
  IsEnum,
  isEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class HomeReponseDto {

  @Exclude()
  _id:ObjectId;

  @Expose({name:"id"})
  id(){
    return this._id;
  }
  @IsNotEmpty()
  address: string;

  @Exclude()
  number_of_bedrooms: number;

  @Expose({name:"numberOfBedrooms"})
  numberOfBedrooms(){
    return this.number_of_bedrooms;
  }

  @Exclude()
  number_of_bathrooms:number;

  @Expose({name:"numberOfBathrooms"})
  numberOfBathrooms(){
    return this.number_of_bathrooms;
  }


  @IsNotEmpty()
  city: string;

  @Exclude()
  listed_date:Date;

  @Expose({name:"listedDate"})
  listedDate(){
    return this.listed_date;
  }
  price: number;

  propertyType:string;

  @Exclude()
  created_at:Date;

  @Exclude()
  updated_at:Date;

  @Exclude()
  realtor_id: string;


  constructor(partial: Partial<HomeReponseDto>){
    Object.assign(this,partial);
  }


}

export class ImageDTO {
  url:string
}

export class CreateHomeDTO{
  @IsString()
  @IsNotEmpty()
  address:string;

  @IsNumber()
  @IsPositive()
  number_of_bedrooms:number;

  @IsNumber()
  @IsPositive()
  number_of_bathrooms:number;

  @IsString()
  @IsNotEmpty()
  city:string;

  @IsNumber()
  @IsPositive()
  price:number;

  @IsNumber()
  @IsPositive()
  land_size:number;

  @IsEnum(PropertyType)
  propertyType:PropertyType;

  // @IsArray()
  // @ValidateNested({each:true})
  // @Type(()=>ImageDTO)
  // image:ImageDTO[]
}

export class UpdateHomeDto{
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?:string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number_of_bedrooms?:number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number_of_bathrooms?:number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?:string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?:number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  land_size?:number;

  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?:PropertyType;
}
