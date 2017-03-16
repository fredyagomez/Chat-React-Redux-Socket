var express = require("express");
var app = express();
var router = express.Router();
var pathdir = __dirname + '/dist/';
var socket = require('./routes/socket.js');
var fs = require('fs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var server = http.createServer(app);

app.use(logger('common')); 
app.use(bodyParser.urlencoded({extended: true}));

router.use(function (req,res,next) {
  console.log(req.method+ " " + req.url + " for " + req.headers.host);
  next();
});

router.get("/",function(req,res){
  console.log("routing file");
  console.log(pathdir+'index.html');
  router.use(express.static('dist'));
  res.sendFile(__dirname + "/dist/index.html");
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, rqst_id');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use("/",router);

/* Socket.io Communication */
var io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

server.listen(1337, function () {
   console.log('Started! at Port 1337');
});

