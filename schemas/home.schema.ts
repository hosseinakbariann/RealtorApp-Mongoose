import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;


export const ImageSchema = new mongoose.Schema({
  id: {type:Number, required:true,autoIncrement:true},
  url: {type:String, required:true},
  created_at: {type:Date, required:true,default:new Date()},
  updated_at: {type:Date, required:true,default:new Date()},
  home_id:{type:Number, required:true},
  home:{type:Schema.Types.ObjectId, ref:'Home'}
});

export const HomeSchema = new mongoose.Schema({
  id: {type:Schema.Types.ObjectId, required:true,autoIncrement:true},
  address: {type:String,unique:true, required:true},
  number_of_bedrooms: {type:Number, required:true},
  number_of_bathrooms: {type:Number, required:true},
  city: {type:String, required:true},
  listed_date: {type:Date, required:true,default:new Date()},
  price: {type:Number, required:true},
  landSize: {type:Number, required:true},
  propertyType: {type:String, required:true, enum : ['residential','condo']},
  created_at: {type:Date, required:true,default:new Date()},
  updated_at: {type:Date, required:true,default:new Date()},
  realtor_id:{type:String,required:true},
  realtor:{type:Schema.Types.ObjectId, ref:'Users'}
});




