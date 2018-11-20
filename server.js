const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketIO(server);

let users = {};
let gameState = null;
let interval;

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

io.on('connection', (socket) => {
  const { id } = socket;
  io.sockets.connected[id].emit('user-connected');

  socket.on('disconnect', () => {
    delete users[id];
    io.emit('user-list-updated', users);
  });
  
  socket.on('new-user-joined', (username) => {    
    users[id] = createUser(id, username);
    io.emit('user-list-updated', users);
    io.sockets.connected[id].emit('game-state-fetched', gameState);
  });

  // socket.on('reset', function (data) {
  //   countdown = 1000;
  //   io.sockets.emit('timer', { countdown: countdown });
  // });

  socket.on('point-scored', (id) => {
    if (io.sockets.connected[id]) {
      if (users[id]) {
        users[id].score++;
        io.emit('user-list-updated', users);
      }
    }
  });
});

server.listen(port, () => {
  initializeGame(); 
  setInterval(initializeGame, 180000);
});

function createUser(id, username) {
  return {
    id: id,
    name: username,
    score: 0
  };
}

/******************************** Game state logic ********************************/

function initializeGame() {
  resetTimer();
  setDefaultGameState();
  getNumberDistribution();
  generateTargetNumber();
  generateNumbers();

  io.emit('game-state-updated', gameState);
}

function resetTimer() {
  clearInterval(interval);
  let timer = 180;
  io.sockets.emit('timer', timer);
  interval = setInterval(() => {
    timer--;
    io.sockets.emit('timer', timer);
  }, 1000);
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
