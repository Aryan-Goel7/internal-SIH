import { Server as SocketIOServer } from 'socket.io';

const socketRouter = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    console.log('Client Connected');

    socket.on('cellUpdate', (data) => {
      console.log(data);
    });
    socket.on('disconnect', () => {
      console.log('Client Disconnected');
    });
  });
};

export default socketRouter;

