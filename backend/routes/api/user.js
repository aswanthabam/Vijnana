const env = process.env
var express = require('express');
const mongoose = require("mongoose");

const User = require("../../models/User");
const Event = require("../../models/Event");


var router = express.Router();

const loginAction = async (p,res,password=null) =>{
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
      if(!(password == null && p.password == null) &&(password== null || p.password == null || password != p.password)) {
        out.status = 400;
        out.description = "Invalid password "+(p.password==null ? "(Google Method)":"");
        res.json(out);
        return true;
      }
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
router.post("/getMyDetails",async (req,res)=>{
  var {userId=null,token=null} = req.body;
  var out = {status:400};
  if(userId == null) out.description = "UserId not provided";
  else if(token == null) out.description = "Token not provided";
  else out.status = 200;
  if(out.status != 200){
    res.json(out);
    return;
  }
  try{
    var tt = await User.find({userId:userId}).populate("participate").then(p=>{
      out.status = 400;
      if(p == null) out.description = "Invalid userId";
      else if(p.length != 1) out.description = "User not found";
      else{
        p = p[0];
        console.log(p);
        console.log("TOKEN: "+p.token+" | "+token)
        if(p.token != token){
          out.description = "Invalid token";
        }else{
          out.status = 200;
          out.description = "User found";
          out.content = {
            userId:p.userId,
            name:p.name,
            email:p.email,
            dob:p.dob,
            course:p.course,
            phone:p.phone,
            picture:p.picture,
            participate:p.participate
          }
        }
      }
      res.json(out)
      return;
    });
    return;
  }catch(e){
    out.status = 500;
    out.description = "Error occured when getting details";
    out.error = e;
    res.json(out);
    return;
  }
})
router.post("/login",async (req,res) =>{
  var {email=null,aud=null,password =null} = req.body;
  var out = {status:400};
  if(email==null) out.description = "Email not provided";
  else if(aud==null && password == null) out.description = "Aud|Pass not provided";
  else out.status = 200;
  if(aud != null && aud != env.CLIENT_ID){
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
      al = await loginAction(p,res,password);
      console.log("Login request");
      console.log(p);
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
  var {name=null,email=null,picture=null,phone=null,course=null,aud=null,password=null} = req.body;
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
      console.log("Create user: Uniqueness check:-")
      console.log(p)
    });
  }
  if(al) return;
  out.status = 400;
  if(picture==null) out.description = "Picture not provided";
  else if(course==null) out.description = "Course not provided";
  else if(aud==null && password==null) out.description = "Aud|Pass not provided";
  else out.status = 200;
  if(out.status != 200)
  {
    out.error = "Invalid Request";
    res.json(out);
    return;
  }
  if(aud != null && aud != env.CLIENT_ID){
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
      course:course,
      password:password
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
   var userId = "VIJNANA23-"+(100+id);
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