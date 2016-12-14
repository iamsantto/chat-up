// ---------------- Required Modules ---------------- >>
var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// ---------------- Varibles ---------------- >>
var port = process.env.PORT || 9900;
var connections = [];

// ---------------- Static Files served at /public ---------------- >>
app.use('/', express.static(path.join(__dirname, 'public')));

// ---------------- Serving Favicon ---------------- >>
app.use(favicon(__dirname + '/public/images/fav.ico'));

// ---------------- Log HTTP Requests ---------------- >>
app.use(morgan('dev'));

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  socket.on('room', function(room){
      socket.join(room);
  })
  
  socket.on('message', function(data){
    io.sockets.in(data.chatRoom).emit('newMessage', {message: data.message});
  })

  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected: %s sockets connected', connections.length);
  })


})

// ---------------- Log Port Details ---------------- >>
console.log('Server running at ' + port);

// ---------------- Start Server ---------------- >>
server.listen(port);
