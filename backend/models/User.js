const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id:{
    type:Number,
    unique:true,
    default:0
  },
  password:{
    type:String,
  },
  userId:{
    type:String,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  name:{
    type:String,
    required:true
  },
  picture:{
    type:String,
    required:true
  },
  course:{
    type:String,
    required:true,
  },
  year:{
    type:Number,
    default:1
  },
  phone:{
    type:String,
    required:true
  },
  teams:{
    type:mongoose.ObjectId,
    ref:"Teams"
  },
  participate:[{type:Schema.Types.ObjectId,ref:"EventRegs"}],
  token:{
    type:String
  },
  expiry:{
    type:Date
  }
},{timestamps:true});
const item = mongoose.model("Users",userSchema);

module.exports = item;