const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  id:{
    type:String,
    required:true,
    unique:true
  },
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  image:{
    type:String
  },
  docs:{
    type:Array
  },
  date:{
    type:Date,
    required:true
  },
  minpart:{
    type:Number,
    required:true
  },
  maxpart:{
    type:Number,
    required:true
  },
  is_team:{
    type:Boolean,
    default:false
  }
},{timestamps:true});
const item = mongoose.model("Games",gameSchema);

module.exports = item;