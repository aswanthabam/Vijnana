const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  id:{
    type:String,
    required:true,
    unique:true
  },
  name:{
    type:String,
    required:true
  },
  participate:{
    type:mongoose.ObjectId,
    ref:"Games",
  },
  members:{
    type:mongoose.ObjectId,
    ref:"Users",
  }
},{timestamps:true});
const item = mongoose.model("Teams",teamSchema);

module.exports = item;