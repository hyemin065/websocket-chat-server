import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server, Socket } from 'socket.io';

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined rom : ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(3001, () => {
  console.log('server runniing');
});
