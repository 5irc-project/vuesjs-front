import socketIO from 'socket.io-client';

// export const socket = socketIO.connect('http://localhost/', {path: "/nodejs/socket.io"});
export const socket = socketIO.connect('http://localhost:8081', {transports: ["websocket"]});

socket.on("notification", (body) => {
  console.log(body);
})

socket.on('connect', () => {
  console.log('connected to socket !')
})

window.socket = socket;