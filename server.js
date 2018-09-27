const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });

  socket.on('message', (message) => {
    console.log('Message Received: ' + message);
    io.emit('message', { type: 'new-message', text: message });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

