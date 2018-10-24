import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';

const app = express();

import userRoutes from './routes/user';
import wsRoutes from './routes/ws/game';
import config from './shared/config';

// const db = mongoose.connect('mongodb://127.0.0.1:27017/users');
const config_port = process.env.PORT || 8080;
const config_host = config.fields.host; //'0.0.0.0';

const server = http.createServer(app);

// This creates our socket using the instance of the server

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type, accept, x-xsrf-token', 'token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Request headers you wish to expose
  res.setHeader('Access-Control-Expose-Headers', false);

  next();
});


//io.origins('*:*');
//app.use(cors());
app.use('/api', userRoutes);
app.use('/ws', wsRoutes);


const io = socketIO(server);

const playersMap = new Array();
const players = {}
let host;


function init(io) {
  //players.push([host.id, host]);

  setInterval(()=>{io.of('game').emit('position_update', playersMap)}, 200);
  io.on('player_shoot', (player) => {
    socket.broadcast.emit('player_shoot', player);
  });

  const chat = io
  .of('/chat')
  .on('connection', (socket) => {
    socket.emit('success', true);
  	socket.on('message', (msg) => {
  		// console.log(msg);
  		socket.broadcast.emit('message', msg);
  	});

  	socket.on('color', (data) => {
  		socket.broadcast.emit('color', data);
  	});


  	socket.on('name', (data) => {
  		socket.broadcast.emit('name', data);
  	});

  });

  const game = io
  .of("/game")
  .on('connection', (socket) => {
  	//socket.emit('connect', JSON.stringify({ hello: 'world', nsp: nsp.name}));
    socket.on('position_update', (player) => {

        playersMap.forEach((p) => {
          if(p[0] == player.id){
            p[1].pos = player.pos;
            return;
          }
        });
        players[socket.id].pos = player.pos;

    });

    socket.on('asteroid_spawn', (asteroid) => {
      socket.broadcast.emit('asteroid_spawn', asteroid);
    });

    socket.on('player_death', (player) => {
      socket.broadcast.emit('player_death', player);
    });

    socket.on('player_shoot', (player) => {
      socket.broadcast.emit('player_shoot', player);
    });

    socket.on('bomb_used', (player) => {
      socket.broadcast.emit('bomb_used', player);
    });

    socket.on('join', (player) => {
      socket.emit('join_data', playersMap);
      if(playersMap.length == 0) {
        host = player;
      }
    		//socket.broadcast.emit('join', player);
    });

    socket.on('player_ready', (player) => {
      //socket.emit('join_data', players);
      //socket.broadcast.emit('join', player);
      if(playersMap.length > 0) {
        player.pos = host.pos;
        playersMap.push([player.id, player])
        players[socket.id] = player;
        console.log(player.id, " has joined the game.");
      } else {
        host = player;
        console.log("Host " + player.id + " started game");
        playersMap.push([player.id, player]);
        players[socket.id] = player;
      }
    });

  	socket.on('host', (player)=>{
  		host = player;
  	});

    socket.on('disconnect', function (event) {
      const player = players[socket.id];
      if(host.id == player.id){
        console.log('Host ' + player.id + ' has left the game');
        socket.broadcast.emit('host_disconnect', player);
      } else {
        console.log(player.id + ' has left the game');
        socket.broadcast.emit('player_disconnect', player);
      }
      playersMap.splice(playersMap.indexOf([player.id, player]), 1);
      delete players[socket.id];
    });
  });
}

function getConnectedSockets(nsp = '/') {
    return Object.values(io.of(nsp).connected);
}

init(io);

server.listen(config_port, config_host, () => {
	console.log("Server running on "+config_host+":" + config_port);
});

// routes go here
