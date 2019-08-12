// const http = require('http');
// const app = require('./backend/app');
// const debug = require('debug')("node-angular");
//
// const socketIo = require('socket.io');
// const server = http.createServer(app);
//
// const normalizePort = val => {
//   var port = parseInt(val,10);
//
//   if(isNaN(port)){
//     //named pipe
//     return val;
//   }
//   if(port>=0){
//     //port number
//     return port;
//   }
//   return false;
// };
//
// const onError = error => {
//   if(error.syscall !== "listen"){
//     throw error;
//   }
//
//
// const bind = typeof  addr === "string" ? "pipe" + addr : "port" + port;
// switch (error.code) {
//   case "EACCES":
//     console.error(bind + "requires elevated privileges");
//     process.exit(1);
//     break;
//   case "EADDRINUSE":
//     console.error(bind + "is already in use");
//     process.exit(1);
//     break;
//   default:
//     throw error;
//  }
// };
//
// const onListening = () => {
//   const addr = server.address();
//   const bind = typeof addr === "string" ? "pipe" +addr : "port" + port;
//   debug("Listening on " + bind);
// };
//
// const port = normalizePort(process.env.PORT || "3000");
// app.set("port",port);
//
//
// server.on("error",onError);
// server.on("listening",onListening);
// server.listen(port);
//
//
// const io = socketIo(server);
//
// io.on('connection', (socket) => {
//   console.log('user connected');
//
//   socket.on('new-message', (message) => {
//     console.log(message);
//   });
// });
//

const app = require('./backend/app');
const debug = require('debug')('chatapp-backend:server');
const http = require('http');


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io').listen(server);

io.on('connection', (socket)=> {
  console.log('new conncetion is add');

  socket.on('join',(data)=>{
    socket.join(data.room);
    // console.log(`${data.user} joined the room: ${data.room}`);
    socket.broadcast.to(data.room).emit('new user joined',{user : data.user , message: 'has joined the room'});
  });
  socket.on('leave',(data)=>{
    socket.leave(data.room);
    // console.log(`${data.user} leave the room: ${data.room}`);
    socket.broadcast.to(data.room).emit('left room',{user : data.user, message: 'left the room'});
  });
  socket.on('message',data => {
    // console.log(data,"msg");
    io.in(data.room).emit('new message',{user: data.user, message: data.message});
  });
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
