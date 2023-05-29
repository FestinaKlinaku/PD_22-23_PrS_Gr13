const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/users.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'users.json'));
});

http.listen(3000, () => {
  console.log('Listening on port 3000');
});

io.on('connection', (socket) => {
  socket.emit('connections', Object.keys(io.sockets.connected).length);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat-message', (data) => {
    socket.broadcast.emit('chat-message', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  });

  socket.on('joined', (data) => {
    socket.broadcast.emit('joined', data);
  });

  socket.on('leave', (data) => {
    socket.broadcast.emit('leave', data);
  });
});
