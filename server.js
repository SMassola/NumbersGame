const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketIO(server);

let counter = 0;
let users = [];
let gameState = null;

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    const index = users.findIndex((user) => user.id === socket.id);
    users.splice(index, 1);
    io.emit('user-list-updated', users);
    socket.disconnect();
  });

  socket.on('message', (message) => {
    io.emit('message', { type: 'new-message', text: message });
  });

  socket.on('new-user-connected', (username) => {
    const user = createUser(socket, username+counter.toString());
    counter++;
    addUserToUserList(user);
    io.emit('user-list-updated', users);
  });

  socket.on('new-game', () => {
    initializeGame();
  });

  socket.on('fetch-game-state', (id) => {
    io.sockets.connected[id].emit('game-state-fetched', gameState);
  });

  socket.on('point-scored', (id) => {
    if (io.sockets.connected[id]) {
      const user = users.find((user) => user.id === id)
      if (user) {
        user.score++;
        io.emit('user-list-updated', users);
      }
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function createUser(socket, username) {
  return {
    id: socket.id,
    name: username,
    score: 0
  };
}

function addUserToUserList(user) {
  users.push(user);
}

/******************************** Game state logic ********************************/

function initializeGame() {
  setDefaultGameState();
  getNumberDistribution();
  generateTargetNumber();
  generateNumbers();
  emitGameState();
}

function setDefaultGameState() {
  gameState = {
    target: null,
    countOfSmalls: null,
    countOfBigs: null,
    numbers: []
  };
}

function getNumberDistribution() {
  gameState.countOfSmalls = Math.floor((Math.random() * 4)) + 3;
  gameState.countOfBigs = 6 - gameState.countOfSmalls;
}

function generateTargetNumber() {
  gameState.target = Math.floor(Math.random() * 900) + 100;
}

function generateNumbers() {
  for (let i = 0; i < gameState.countOfSmalls; i++) {
    gameState.numbers.push(Math.floor(Math.random() * 9) + 1);
  }

  for (let i = 0; i < gameState.countOfBigs; i++) {
    gameState.numbers.push((Math.floor(Math.random() * 4) + 1) * 25);
  }
}

function emitGameState() {
  io.emit('game-state-updated', gameState);
}
