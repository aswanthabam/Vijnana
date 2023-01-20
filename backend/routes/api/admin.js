const env = process.env
var express = require('express');
const mongoose = require("mongoose");

const User = require("../../models/User");
const Admin = require("../../models/Admin");


var router = express.Router();
router.post("/is_admin",async (req,res) =>{
  var {token=null} = req.body;
  var out = {status:400}
  if(token == null) out.description = "Token not found";
  else out.status = 200;
  if(out.status != 200){
    res.json(out);
    return;
  }
  
  console.log("Admin Authentication process....");
  var date = new Date();
  console.log("Today time: "+date.toISOString())
  try{
  await Admin.find({token:token}).then(p=>{
    if(p == null){
      out.status = 400;
      out.description = "Invalid token";
      console.log("Invalid token 1 NULL");
    }else if(p.length != 1){
      out.status = 400;
      out.description = "Invalid token";
      console.log("Invalid token 2");
    }else{
      p = p[0];
      if(date.getFullYear() >= p.expiry.getFullYear() && date.getMonth() >= p.expiry.getDate() && date.getDate() >= p.expiry.getDate() && date.getHours() >= p.expiry.getHours() && date.getMinutes() >= p.expiry.getMinutes()){
        console.log("Expired token");
        console.log(date.getFullYear()+"/"+date.getMonth()+" | Token expiry: "+p.expiry);
        out.status = 400;
        out.description = "Expired token";
      }else{
        console.log("Auth success");
        out.status = 200;
        out.description = "Valid token";
        out.content = {
          expiry:p.expiry,
          valid:true
        }
      }
    }
    res.json(out);
    return;
  });
  }catch(e){
    out.status = 500;
    out.description = "Error when fetching admin data";
    out.error = e;
    res.json(out)
    return;
  }
})
router.post("/login",async (req,res) =>{
  var {user=null,pass=null} = req.body;
  var out = {
    status:400
  }
  if(user == null) out.description = "User not provided";
  else if(pass== null) out.description = "Password not provided";
  else{
    out.status = 200;
    out.description = "Request is ok";
  }
  console.log("ADMIN TOKEN GENERATION")
  console.log("USER :"+user+"|"+env.USER)
  console.log("PASS :"+pass+"|"+env.PASS)
  if(user != env.USER) {
    out.status = 400;
    out.description = "User not matched";
  }
  else if(pass != env.PASS) {
    out.status = 400;
    out.description = "Password mismatch";
  }
  if(out.status != 200) {
    res.json(out)
    return;
  }
  
  var date = new Date();
  var token = null;
 // if(p.token == null || p.token == undefined || p.expiry == null || p.expiry == undefined){
  token = btoa("AdminisAswanth|D"+date.getDate()+"M"+date.getMonth()+"Y"+date.getFullYear()+"H"+date.getHours()+"M"+date.getMinutes()+"S"+date.getSeconds()+"CL").replace("=","");
  date.setDate(date.getDate() + 14);
  var p = new Admin({
    token:token,
    expiry:date
  })
  try{
    await p.save();
    out.status = 200;
    out.description = "Logged in";
    out.content={
      token:token,
      expiry:date
    }
    res.json(out)
    return;
  }catch(e){
    console.log(e)
    out.status = 500;
    out.description = "Error when loggin in";
    out.error = e;
    res.json(out)
    return;
  }
});

module.exports = router;