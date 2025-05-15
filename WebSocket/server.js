const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" } 
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('notificacaoNovaVaga', (mensagem) => {
    
    var msg = {
      idEstacionamento: mensagem.idEstacionamento,
      status: mensagem.status,
      tipoVaga: mensagem.tipoVaga,
      id: socket.id,
      data: new Date().toISOString()
    }

    console.log('Mensagem recebida:', msg);
    io.emit('notificacaoNovaVaga', msg); // Broadcast para todos
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

httpServer.listen(5004, () => {
  console.log('Socket.IO ouvindo em http://localhost:5004');
});
