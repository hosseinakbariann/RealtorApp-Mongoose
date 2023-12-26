import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const MessageSchema = new mongoose.Schema({
  id:{type:Number,autoIncrement:true},
  message:{type:String,autoIncrement:true},
  home_id:{type:Number},
  home:{type:Schema.Types.ObjectId, ref:'Users'},
  realtor_id:{type:Number,required:true},
  realtor:{type:Schema.Types.ObjectId, ref:'Home'},
  buyer_id:{type:Number,required:true},
  buyer:{type:Schema.Types.ObjectId, ref:'Home'}
});
