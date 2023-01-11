var env = process.env
var express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var cors = require('cors');

var indexRouter = require("./routes/index");
var userRouter = require("./routes/api/user");
var adminRouter = require("./routes/admin");
var adminApiRouter = require("./routes/api/admin");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use("/",indexRouter);
app.use("/api/user",userRouter);
app.use("/api/admin",adminApiRouter);
app.use("/admin",adminRouter);

const uri = "mongodb+srv://avctech:avctech@cluster0.4wxlu7g.mongodb.net/Tech-Fest?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) =>{
    console.log("CONNECTED TO DB");
  })
  .catch((err) => {
    console.log("CANT CONNECT TO DB");
    console.log(err);
});

app.listen(env.PORT || 3001,"0.0.0.0");