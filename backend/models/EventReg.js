const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventRegSchema = new Schema({
  eventId:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
  date:{
    type:Date
  }
});
const item = mongoose.model("EventRegs",eventRegSchema);

module.exports = item;