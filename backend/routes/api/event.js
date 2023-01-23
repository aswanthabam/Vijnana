const env = process.env
var express = require('express');
const mongoose = require("mongoose");

const User = require("../../models/User");
const Admin = require("../../models/Admin");
const Event = require("../../models/Event");
const EventReg = require("../../models/EventReg");


var router = express.Router();

// Route : /api/event/register (POST)

router.post("/register",async (req,res) => {
  // Register To Event
  var {id = null, userId=null} = req.body;
  var out = {status:400};
  if(id == null) out.description = "ID not provided";
  else if(userId == null) out.description = "UserID not provided";
  else out.status = 200;
  if(out.status != 200) {
    // not a valid request
    res.json(out);
    return;
  }
  console.log("Registeration to event "+id);
  console.log("Request is ok");
  try {
    var user = await User.find({userId:userId});
    if(user == null) {
      out.status = 400;
      out.description = "User error";
    }else if(user.length != 1) {
      out.status = 400;
      out.description = "User error";
    }else {
      // valid user
      var event = await Event.find({id:id});
      if(user == null) {
        out.status = 400;
        out.description = "Event not found error";
      }else if(user.length != 1) {
        out.status = 400;
        out.description = "Event not found error";
      }else {
        // Valid event
        user = user[0];
        event = event[0];
        console.log("User instance:-");
        console.log(user);
        console.log("Event instance:-");
        console.log(event);
        // Gets the event registration instance of the perticular event and user
        var eventReg = await EventReg.find({userId:user .userId,eventId:event.id});
        var has = true;
        if(eventReg == null) has = false;
        else if(eventReg.length <= 0) has = false;
        if(has) {
          // Event is already registered
          console.log("Already registered, instance:-");
          console.log(eventReg)
          out.status = 400;
          out.description = "Already registered";
        }else {
          // creaete a new Event registration instance
          var eventReg = new EventReg({
            userId:user.userId,
            eventId:event.id,
            date:new Date()
          });
          await eventReg.save();
          // update the event and user with the perticular event and user 
          event.participants.push(mongoose.Types.ObjectId(eventReg._id));
          await event.save();
          user.participate.push(mongoose.Types.ObjectId(eventReg._id));
          await user.save();
          console.log("Registered");
          console.log(eventReg);
          out.status = 200;
          out.description = "Successfuly registered";
          out.content = {
            userId:user.userId,
            eventId:event.id,
            participate:user.participate
          }
        }
      }
    }
    res.json(out);
  }catch(e) {
    // Unexpected error is occured
    console.log("Error Occured");
    console.log(e);
    out.status = 500;
    out.description = "Error while fetching";
    out.error = e;
    res.json(out);
    return;
  }
});

// Route : /api/event/delete (GET)

router.post("/delete",async (req,res) =>{
  // Event deletion request from the admin
  var {id = null,token=null} = req.body;
  var out = {}
  var admin = false;
  if(id == null){
    out.status = 400;
    out.description = "Id not given";
    res.json(out);
    return;
  }
  console.log("Deletion "+id+" token "+token);
  if(token != null) {
    // Admin validation
    console.log("Checking admin");
    var p = await Admin.find({token:token});
    if(p == null){
      out.status = 400;
      out.description = "Invalid token"
    }else if(p.length != 1){
      out.status = 400;
      out.description = "Invalid token"
    } else {
      p = p[0];
      var date = new Date();
      if(date.getFullYear() >= p.expiry.getFullYear() && date.getMonth() >= p.expiry.getDate() && date.getDate() >= p.expiry.getDate() && date.getHours() >= p.expiry.getHours() && date.getMinutes() >= p.expiry.getMinutes()) {
        out.status = 400;
        out.description = "Expired token";
      }else admin = true;
    }
    if(!admin) {
      console.log("User is admin ✔️");
      res.json(out);
      return;
    }
    console.log("User is not admin ❌");
  }else {
    out.status = 400;
    out.description = "Token not given";
    res.json(out);
    return;
  }
  try {
    // Delete the event
    await Event.deleteOne({id:id}).then((err)=>{
      try {
        if(err.deletedCount< 1) {
          console.log("Unable to Delete")
          console.log(err)
          out.status = 400;
          out.description = "Unable to delete ";
        }else {
          console.log("Deleted successfully ")
          out.status = 200;
          out.description = "Deleted Successfuly";
          out.content = p;
        }
      }catch(err){
        out.status = 500;
        out.description = "Error deleting -";
        out.error = err;
      }
    });
    res.json(out);
    return;
  }catch(e){
    // An umnknown error occured
    console.log("Error occured");
    console.log(e)
    out.status = 500;
    out.description = "Error fetching data";
    out.error = e;
    res.json(out);
    return;
  }
});

// Route : /api/event/get (GET)

router.get("/get",async (req,res)=>{
  var {id = null} = req.query;
  var out = {}
 // var admin = false;
  if(id == null){
    out.status = 400;
    out.description = "Id not given";
    res.json(out);
    return;
  }
  console.log("Event data get : "+id);
  /*
  if(token != null) {
    var p = await Admin.find({token:token});
    if(p == null){
      out.status = 400;
      out.description = "Invalid token"
    }else if(p.length != 1){
      out.status = 400;
      out.description = "Invalid token"
    } else {
      p = p[0];
      var date = new Date();
      if(date.getFullYear() >= p.expiry.getFullYear() && date.getMonth() >= p.expiry.getDate() && date.getDate() >= p.expiry.getDate() && date.getHours() >= p.expiry.getHours() && date.getMinutes() >= p.expiry.getMinutes()) {
        out.status = 400;
        out.description = "Expired token";
      }else admin = true;
    }
    if(!admin) {
      res.json(out);
      return;
    }
  }*/
  try{
    // Find all events and link the particular events with EventReg
    var p = await Event.find({id:id}).populate("participants");
    if(p == null || p.length != 1) {
      out.status = 400;
      out.description = "Event not found";
      res.json(out)
      return;
    }
    console.log(p);
    out.status = 200;
    out.description = "Success";
    out.content = {
      ...p[0]._doc
    }
    res.json(out);
    return;
  }catch(e){
    console.log("Error occured");
    console.log(e);
    out.status = 500;
    out.description = "Error while fetching data";
    res.json(out);
    return;
  }
})

// Route : /api/event/getAll (GET)

router.get("/getAll",async (req,res) =>{
  var {token=null,count=-1} = req.query;
  var out = {status:200};
  try{
    var admin = false;
    if(token != null) {
      // Check if admin
      console.log("Admin Check ");
      var p = await Admin.find({token:token});
      if(p == null){
        out.status = 400;
        out.description = "Invalid token"
      }else if(p.length != 1){
        out.status = 400;
        out.description = "Invalid token"
      } else {
        p = p[0];
        var date = new Date();
        if(date.getFullYear() >= p.expiry.getFullYear() && date.getMonth() >= p.expiry.getDate() && date.getDate() >= p.expiry.getDate() && date.getHours() >= p.expiry.getHours() && date.getMinutes() >= p.expiry.getMinutes()) {
          out.status = 400;
          out.description = "Expired token";
        }else admin = true;
      }
      if(!admin) {
        console.log("Not an Admin ❌");
        res.json(out);
        return;
      }else console.log("Admin ✔️")
    }
    // Get the corresponding event list
    if(count == -1) var p = await Event.find().populate("participants").sort({date:1});//.then(p =>{
    else var p = await Event.find().populate("participants").sort({date:1}).limit(count);//.then(p =>{
    if(p == null) {
      out.status = 400;
      out.description = "no events";
      res.json(out);
      return;
    }
    console.log("Events:-");
    console.log(p);
    var data = [];
    for(var i = 0;i < p.length;i++){
      // push each event to the data and return it as responce
      var cur = p[i];
      // Participant data giving accourding to admin and normal user
      var participants = [];
      if(!admin) {
        for(var j = 0;j < cur.participants.length;j++){
          participants.push({userId:cur.participants[j].userId});
        }
      }else participants = cur.participants;
      console.log(participants)
      data.push({
        id:cur.id,
        name:cur.name,
        description:cur.description,
        date:cur.date,
        type:cur.type,
        image:cur.image,
        docs:cur.docs,
        minPart:cur.minpart,
        maxPart:cur.maxpart,
        poster:cur.poster,
        is_team:cur.is_team,
        is_reg:cur.is_reg,
        participants:participants,
        teams:admin ? cur.teams : null
      });
    }
    out.status = 200;
    out.description = "Successfuly fetched";
    out.content = data;
    res.json(out);
    return;
  }catch(e){
    console.log("Error occurred ");
    console.log(e);
    out.status = 500;
    out.description = "Error while fetching";
    out.error = e;
  }
})

// Route : /api/event/edit (POST)

router.post("/edit",async (req,res) => {
  var {id=null,name=null, description=null,date=null,type=null,image=null,maxPart=1,minPart=1,poster=null,docs=null,is_reg=true} = req.body;
  var out = {status:400}
  if(id == null) out.description = "ID Not given";
  else {
    out.status = 200;
  }
  if(out.status != 200){
    res.json(out);
    return;
  }
  try{
    //Find the event
    var ev = await Event.find({id:id});
    console.log(ev);
    if(ev == null) {
      out.status = 400;
      out.description = "No event with the id";
    }else if(ev.length != 1) {
      out.status = 400;
      out.description = "No event with the id";
    }else {
      ev = ev[0]; 
      // Update the corresponding values
      if(name != null) ev.name = name;
      if(description != null) ev.description = description;
      if(date != null) ev.date = date;
      if(type != null) ev.type = type;
      if(image != null) ev.image = image;
      if(maxPart != null) ev.maxpart = maxPart;
      if(minPart != null) ev.minpart = minPart;
      if(poster != null) ev.poster = poster;
      if(docs != null) ev.docs = docs;
      ev.is_reg = is_reg;
      await ev.save(); //save
      out.status = 200;
      out.description = "Event saved ("+name+")";
      out.content = ev;
    }
    res.json(out);
    return;
  }catch(e){
    out.status = 500;
    out.description = "Error when saving data";
    out.error = e;
    res.json(out);
    return;
  }
});

// Route : /api/event/create

router.post("/create",async (req,res) => {
  var {name=null, description=null,date=null,type=null,image=null,maxPart=1,minPart=1,poster=null,docs=null,is_reg=true} = req.body;
  var out = {status:400}
  if(name == null) out.description = "Name not provided";
  else if(description == null) out.description = "description not provided";
  else if(date == null) out.description = "date not provided";
  else if(type == null) out.description = "type not provided";
  else if(image == null) out.description = "image not provided";
  else {
    out.status = 200;
  }
  if(out.status != 200){
    res.json(out);
    return;
  }
  try{
    // Create an id fpr the event
    var id = (type+"-"+name.replace(" ","").toLowerCase()+"-"+new Date(date).getDate()).replace("/","").replace("&","").replace("?","").replace("+","");//btoa("Event"+type+name+new Date()).replace("=","");
    var ev = new Event({
      id:id,
      name:name,
      description:description,
      image:image,
      docs:docs,
      date:date,
      minpart:minPart,
      maxpart:maxPart,
      is_team:minPart > 1,
      type:type,
      poster:poster,
      is_reg:is_reg
    });
    await ev.save(); // save
    out.status = 200;
    out.description = "Event created ("+name+")";
    out.content = ev;
    res.json(out);
    return;
  }catch(e){
    out.status = 500;
    out.description = "Error when saving data";
    console.log(e);
    out.error = e;
    res.json(out);
    return;
  }
});

module.exports = router;