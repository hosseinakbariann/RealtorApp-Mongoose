import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: {type:String, required:true},
  phone: {type:String, required:true},
  email: {type:String,unique:true, required:true},
  password: {type:String, required:true},
  created_at: {type:Date, required:true,default:new Date()},
  updated_at: {type:Date, required:true,default:new Date()},
  user_type: {type:String, required:true, enum : ['buyer','realtor','admin']}
});



