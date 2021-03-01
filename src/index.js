const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('src'));

let myMap = new Map();

app.get('/', (req, res) => {
  console.log('send');
  res.sendFile(__dirname + '/home.html');
});

app.get('/room/', (req, res) => {
  res.sendFile(__dirname + '/room.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  const roomName = 'room ' + socket.handshake.query.room;
  const socketId = socket.id;
  myMap.set(socketId, roomName);
  socket.join(roomName);
  socket.on('send message', (msg) => {
    console.log('send message');
    const roomName = myMap.get(socket.id);
    socket.to(roomName).emit('receive message', msg);
  });
});
http.listen(3000, () => {
  console.log('listening on *:3000');
});
