import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';

const app = express();

import userRoutes from './routes/user';
import wsRoutes from './routes/ws/game';

const db = mongoose.connect('mongodb://127.0.0.1:27017/users');
const port = process.env.PORT || 8080;

const server = http.createServer(app);

// This creates our socket using the instance of the server
app.use(function (req, res, next) {
  console.log('Headers Middleware Called');

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

const players = new Array();
const host = {
		id: 'HOST',
		color: '0x00F0F0',
		pos: {
			x: 400,
			y: 400
		}
};


function init(io) {
  players.push([host.id, host]);

  setInterval(()=>{io.of('game').emit('update', players)}, 300);
  const chat = io
  .of('/chat')
  .on('connection', (socket) => {

  	socket.on('message', (msg) => {
  		console.log(msg);
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
    socket.on('update', (player) => {
        //socket.emit('join_data', players);
        //socket.broadcast.emit('join', player);
        //console.log("update", player.id);
        players.forEach(
          p => {
            if(player.id == p[0]) {
              p[1].pos = player.pos;
              //console.log(true, p);
              return;
            }
          });
      });

    socket.on('join', (player) => {
  		socket.emit('join_data', players);
  		//socket.broadcast.emit('join', player);
  	});


    socket.on('player_ready', (player) => {
      //socket.emit('join_data', players);
      //socket.broadcast.emit('join', player);
      player.pos = host.pos;
      players.push([player.id, player])
      console.log(player, "joined the game");
    });

  	socket.on('host', (player)=>{
  		host = player;
  	});

    socket.on('disconnect', function () {
      io.emit('Client disconnected');
    });
  });

}

init(io);

server.listen(port, "192.168.1.7", () => {
	console.log("Server running on 127.0.0.1:" + port);
});

// routes go here
