import mongoose from 'mongoose'

const userSchema  = new mongoose.Schema({
  email:{type:String,require:true},
  password:{type:String,require:true},
  createdAt:{type:Date,default:Date.now},
  age:{type:Number},
  caste:{type:String},
  income:{type:String},
  gender:{type:String},
  states:{type:String},
  highedu:{type:String},
  occupation:{type:String},
  empstatus:{type:String},
  disability:{type:String},
  marriage:{type:String},

})

export const User = mongoose.model("User",userSchema)