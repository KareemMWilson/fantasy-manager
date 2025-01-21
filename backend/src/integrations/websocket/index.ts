import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const initializeSocketIO = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId as string;
    
    if (!userId) {
      socket.disconnect();
      return;
    }

    console.log(`User ${userId} connected to socket`);

    socket.join(`user:${userId}`);

    socket.on('disconnect', () => {
      console.log(`User ${userId} disconnected from socket`);
    });
  });


  return io;
};
