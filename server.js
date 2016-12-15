// ---------------- Required Modules ---------------- >>
var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var getMessage = require('./routes/getMessages_api');
var saveMessage = require('./routes/saveMessages_api');
var parser = require('body-parser');

// ---------------- Varibles ---------------- >>
var port = process.env.PORT || 9900;
var connections = [];

// ---------------- Static Files served at /public ---------------- >>
app.use('/', express.static(path.join(__dirname, 'public')));

// ---------------- Serving Favicon ---------------- >>
app.use(favicon(__dirname + '/public/images/fav.ico'));

// ---------------- Body Parser ---------------- >>
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

// ---------------- Log HTTP Requests ---------------- >>
app.use(morgan('dev'));

// ---------------- Socket.io Operations ---------------- >>
io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
  //joining a new room
  socket.on('room', function(room){
      socket.join(room);
  })
  //new message
  socket.on('message', function(data){
    io.sockets.in(data.room).emit('newMessage', data);
  })
  //disconnect
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected: %s sockets connected', connections.length);
  })
})

// ---------------- API Routes ---------------- >>
app.use('/api',getMessage);
app.use('/api',saveMessage);

// ---------------- Log Port Details ---------------- >>
console.log('Server running at ' + port);

// ---------------- Start Server ---------------- >>
server.listen(port);
