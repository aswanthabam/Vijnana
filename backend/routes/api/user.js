const env = process.env
var express = require('express');
const mongoose = require("mongoose");

const User = require("../../models/User");


var router = express.Router();

const loginAction = async (p,res) =>{
  //console.log(p);
  var out = {};
  try{
    if(p == null) return false;
    if(p.length < 1) return false;
    else if(p.length > 1) {
      out.status = 500;
      out.description = "Multiple users with same email. Please report to admin. Aswanth V C";
      out.error = "uniqueness error";
      res.json(out);
      return true;
    }
    else{
      p = p[0];
      console.log(p.token)
      var date = new Date();
      out.status = 200;
      out.description = "User authentication successful ";
      var date = new Date();
      var token = null;
      if(p.token == null || p.token == undefined || p.expiry == null || p.expiry == undefined){
        token = btoa(email+"D"+date.getDate()+"M"+date.getMonth()+"Y"+date.getFullYear()+"H"+date.getHours()+"M"+date.getMinutes()+"S"+date.getSeconds()+"CL").replace("=","");
        date.setDate(date.getDate() + 14);
        p.token = token;
        p.expiry = date;
        await p.save();
      }else{
        token = p.token;
        date = p.expiry;
      }
      
     console.log("TOKEN : "+token);
     console.log("EXPIRY : "+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+" @"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
     out.content = {
        token:token,
        expiry:date,
        userId:p.userId
     };
     res.json(out);
     return true;
    }
  }catch(e){
      out.status = 500;
      out.description = "Unable to login. the user was already created but an error occured when loging in. report this issue to admin. Aswanth v C";
      out.error = e;
      res.json(out);
      return true;
   }
   return false;
};
router.get("/",(req,res)=>{
  res.json({hi:"6"});
});
router.post("/login",async (req,res) =>{
  var {email=null,aud=null} = req.body;
  var out = {status:400};
  if(email==null) out.description = "Email not provided";
  else if(aud==null) out.description = "Aud not provided";
  else out.status = 200;
  if(aud != env.CLIENT_ID){
    out.status = 400;
    out.description = "Unknown client";
    out.error = "Invalid Request";
    res.json(out);
    return;
  }
  var al = false;
  if(out.status != 200)
  {
    out.error = "Invalid Request";
    res.json(out);
    return;
  }else{
    await User.find({email:email}).then(async (p)=>{
      al = await loginAction(p,res);
    });
  }
  if(!al){
    out.status = 400;
    out.description = "User not logged in";
    res.json(out);
    return;
  }
});
router.post("/create",async (req,res)=>{
  var {name=null,email=null,picture=null,phone=null,dob=null,course=null,aud=null} = req.body;
  var out = {status:400};
  if(name==null) out.description = "Name not provided";
  else if(email==null) out.description = "Email not provided";
  else out.status = 200;
  var al = false;
  if(out.status != 200)
  {
    out.error = "Invalid Request";
    res.json(out);
    return;
  }else{
    await User.find({email:email}).then(async (p)=>{
      al = await loginAction(p,res);
    });
  }
  if(al) return;
  out.status = 400;
  if(picture==null) out.description = "Picture not provided";
  else if(dob==null) out.description = "DOB not provided";
  else if(course==null) out.description = "Course not provided";
  else if(aud==null) out.description = "Aud not provided";
  else out.status = 200;
  if(out.status != 200)
  {
    out.error = "Invalid Request";
    res.json(out);
    return;
  }
  if(aud != env.CLIENT_ID){
    out.status = 400;
    out.description = "Unknown client";
    out.error = "Invalid Request";
    res.json(out);
    return;
  }
  try{
    var user = new User({
      name:name,
      email:email,
      picture:picture,
      phone:phone,
      dob:dob,
      course:course
    });
   await user.save();
   var id = 0;
   var obje = User.find().sort({"id":-1}).limit(1);
   await obje.then(obj=>{
     try{
       //console.log(obj);
       if(obj == null) id = 1;
       else if(obj.length == 0) id = 1;
       else if(obj.length > 1){
         out.status = 500;
         out.description = "Error with the uniqueness of users. this may be occured in the server side. please contact the admin. (Aswanth V C)";
         out.error = "uniqueness failed";
         res.json(out);
       }
       else{
         id = obj[0].id + 1;
       }
     }catch(e){
       out.status = 500;
       out.description = "User saved!. but unable to complete the process. report this issue to the admin. (Aswanth V C)";
       out.error = e;
       res.json(out);
       return;
     }
   });
   var userId = "VIDHYA23-"+(100+id);
   var date = new Date();
   var token = btoa(email+"D"+date.getDate()+"M"+date.getMonth()+"Y"+date.getFullYear()+"H"+date.getHours()+"M"+date.getMinutes()+"S"+date.getSeconds()+"CL").replace("=","");
   date.setDate(date.getDate() + 14);
   console.log("TOKEN : "+token);
   console.log("EXPIRY : "+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+" @"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
   user.id = id;
   user.userId = userId;
   user.token = token;
   user.expiry = date;
   await user.save();
   out.status = 200;
   out.description = "User created successfully ";
   out.content = {
     token:token,
     expiry:date,
     userId:userId
   }
   res.json(out);
   return;
  }catch(e){
    out.status = 500;
    out.error = "Error saving ("+e+")";
    out.description = "Unable to save the user instance";
    res.json(out);
    return;
  }
});
module.exports = router;