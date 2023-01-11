const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  token:{
    type:String
  },
  expiry:{
    type:Date
  }
},{timestamps:true});
const item = mongoose.model("Admin",adminSchema);

module.exports = item;