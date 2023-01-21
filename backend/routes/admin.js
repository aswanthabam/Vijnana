const env = process.env;
var express = require('express');
const mongoose = require("mongoose");

const User = require("../models/User");
const Event = require("../models/Event");
const Team = require("../models/Team");


var router = express.Router();


router.post("/syshid/drop-events",(req,res)=>{
  var {usr = null,pass = null} = req.body;
  var out = {
    description:"Deletion of collection Events"
  }
  console.log("Trying to drop collection Events...");
  console.log("User "+usr+" | | "+env.USER+(usr == env.USER));
  console.log("Pass "+pass+" | | "+env.PASS+(pass == env.PASS));
  if(usr == env.USER && pass == env.PASS)
  {
    try{
      const v = Event.collection.drop();
      out.content = [
        v,
      ]
      out.status = 200;
      res.status(200).json(out);
    }catch(e){
      out.status = 500;
      out.error = e;
      res.json(out)
    }
  }else
  {
    out.status = 400;
    out.error = "Authentication failed";
    res.json(out);
  }
});
router.post("/syshid/get-events",async (req,res)=>{
  var {usr = null,pass = null} = req.body;
  var out = {
    description:"get all Events"
  }
  console.log("Trying to get collection Events...");
  console.log("User "+usr+" | | "+env.USER+(usr == env.USER));
  console.log("Pass "+pass+" | | "+env.PASS+(pass == env.PASS));
  if(usr == env.USER && pass == env.PASS)
  {
    try{
      const v = await Event.find();
      out.content = v;
      out.status = 200;
      res.status(200).json(out);
    }catch(e){
      out.status = 500;
      out.error = e;
      res.json(out)
    }
  }else
  {
    out.status = 400;
    out.error = "Authentication failed";
    res.json(out);
  }
});
// Users
router.post("/syshid/drop-users",(req,res)=>{
  var {usr = null,pass = null} = req.body;
  var out = {
    description:"Deletion of collection Users"
  }
  console.log("Trying to drop collection Users...");
  console.log("User "+usr+" | | "+env.USER+(usr == env.USER));
  console.log("Pass "+pass+" | | "+env.PASS+(pass == env.PASS));
  if(usr == env.USER && pass == env.PASS)
  {
    try{
      const v = User.collection.drop();
      out.content = [
        v,
      ]
      out.status = 200;
      res.status(200).json(out);
    }catch(e){
      out.status = 500;
      out.error = e;
      res.status(500).json(out)
    }
  }else
  {
    out.status = 400;
    out.error = "Authentication failed";
    res.status(400).json(out);
  }
});
router.post("/syshid/get-users",async (req,res)=>{
  var {usr = null,pass = null} = req.body;
  var out = {
    description:"get all Users"
  }
  console.log("Trying to get collection Users...");
  console.log("User "+usr+" | | "+env.USER+(usr == env.USER));
  console.log("Pass "+pass+" | | "+env.PASS+(pass == env.PASS));
  if(usr == env.USER && pass == env.PASS)
  {
    try{
      const v = await User.find();
      out.content = v;
      out.status = 200;
      res.status(200).json(out);
    }catch(e){
      out.status = 500;
      out.error = e;
      res.status(500).json(out)
    }
  }else
  {
    out.status = 400;
    out.error = "Authentication failed";
    res.status(400).json(out);
  }
});
/*
router.post("/syshid/drop-items",(req,res)=>{
  var {usr = null,pass = null} = req.body;
  var out = {
    description:"Deletion of collection items"
  }
  console.log("Trying to drop collection items...");
  console.log("User "+usr+" | | "+env.USER+(usr == env.USER));
  console.log("Pass "+pass+" | | "+env.PASS+(pass == env.PASS));
  if(usr == env.USER && pass == env.PASS)
  {
    try{
      const v = Item.collection.drop();
      out.content = [
        v,
      ]
      out.status = 200;
      res.status(200).json(out);
    }catch(e){
      out.status = 500;
      out.error = e;
      res.status(500).json(out)
    }
  }else
  {
    out.status = 400;
    out.error = "Authentication failed";
    res.status(400).json(out);
  }
});
router.post("/syshid/drop-enviornments",(req,res)=>{
  var {usr = null,pass = null} = req.body;
  var out = {
    description:"Deletion of collection Enviornments"
  }
  console.log("Trying to drop collection Enviornment...");
  console.log("User "+usr+" | | "+env.USER+(usr == env.USER));
  console.log("Pass "+pass+" | | "+env.PASS+(pass == env.PASS));
  if(usr == env.USER && pass == env.PASS)
  {
    try{
      const v = Enviornment.collection.drop();
      out.content = [
        v,
      ]
      out.status = 200;
      res.status(200).json(out);
    }catch(e){
      out.status = 500;
      out.error = e;
      res.status(500).json(out)
    }
  }else
  {
    out.status = 400;
    out.error = "Authentication failed";
    res.status(400).json(out);
  }
});
router.post("/syshid/drop-projects",(req,res)=>{
  var {usr = null,pass = null} = req.body;
  var out = {
    description:"Deletion of collection projects"
  }
  console.log("Trying to drop collection projects...");
  console.log("User "+usr+" | | "+env.USER+(usr == env.USER));
  console.log("Pass "+pass+" | | "+env.PASS+(pass == env.PASS));
  if(usr == env.USER && pass == env.PASS)
  {
    try{
      const v = Projects.collection.drop();
      out.content = [
        v,
      ]
      out.status = 200;
      res.status(200).json(out);
    }catch(e){
      out.status = 500;
      out.error = e;
      res.status(500).json(out)
    }
  }else
  {
    out.status = 400;
    out.error = "Authentication failed";
    res.status(400).json(out);
  }
});*/
module.exports = router;