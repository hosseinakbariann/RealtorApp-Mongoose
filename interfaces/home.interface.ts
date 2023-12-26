import { Document, Types } from 'mongoose';
import { ObjectId } from "mongoose";
import { PropertyType } from '../enums/propertyType';

export interface Home extends Document {
  readonly id:ObjectId,
  readonly address: string;
  readonly number_of_bedrooms: number,
  readonly number_of_bathrooms: number,
  readonly city:string,
  readonly price: number,
  readonly landSize: number,
  readonly propertyType: PropertyType,
  readonly realtor_id:string
}


