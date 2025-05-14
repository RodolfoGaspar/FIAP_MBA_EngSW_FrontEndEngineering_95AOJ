import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" } // Configure CORS conforme necessário
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('notificacao', (mensagem) => {
    
    var msg = {
        texto: mensagem.texto,
        id: socket.id
    }

    console.log('Mensagem recebida:', msg);
    io.emit('notificacao', msg); // Broadcast para todos
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

httpServer.listen(8080, () => {
  console.log('Socket.IO ouvindo em http://localhost:8080');
});
