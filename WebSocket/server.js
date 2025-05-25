const { z } = require('zod'); // Adicione no topo do arquivo
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Esquemas de validação Zod
const NovaVagaSchema = z.object({
  id: z.string().trim().min(1),
  idEstacionamento: z.string().trim().min(1),
  nomeEstacionamento: z.string().trim().min(1),  
  status: z.number().int().min(0),
  tipoVaga: z.number().int().min(0),
  valorHora: z.number().min(0)
});

const AlteracaoVagaSchema = z.object({
  id: z.string().trim().min(1), // Corresponde ao idVaga
  idEstacionamento: z.string().trim().min(1),
  status: z.number().int().min(0),
  tipoVaga: z.number().int().min(0),
  valorHora: z.number().min(0)
});

const ExcluirVagaSchema = z.object({
  id: z.string().trim().min(1) // Corresponde ao idVaga
});

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
  pingTimeout: 10000,    // 10 segundos para timeout do ping
  pingInterval: 5000,    // 5 segundos entre pings
  connectTimeout: 20000, // 20 segundos para timeout de conexão
  transports: ['websocket'],
  allowEIO3: true
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id, 'em:', new Date().toISOString());

  socket.on('notificacaoNovaVaga', (mensagem) => {
    try {
      const validatedData = NovaVagaSchema.parse(mensagem);
      
      const msg = {
        id: validatedData.id,
        idEstacionamento: validatedData.idEstacionamento,
        nomeEstacionamento: validatedData.nomeEstacionamento,
        status: validatedData.status,
        tipoVaga: validatedData.tipoVaga,
        valorHora: validatedData.valorHora,
        idClient: socket.id,
        data: new Date().toISOString()
      };

      console.log('Mensagem validada - Nova Vaga:', msg);
      io.emit('notificacaoNovaVaga', msg);
    } catch (error) {
      console.error('Erro de validação Nova Vaga:', error.errors);
    }
  });

  socket.on('notificacaoAlteracaoDeVaga', (mensagem) => {
    try {
      const validatedData = AlteracaoVagaSchema.parse(mensagem);
      
      const msg = {
        id: validatedData.id,
        idEstacionamento: validatedData.idEstacionamento,
        status: validatedData.status,
        tipoVaga: validatedData.tipoVaga,
        valorHora: validatedData.valorHora,
        idClient: socket.id,
        data: new Date().toISOString()
      };

      console.log('Mensagem validada - Alteração de Vaga:', msg);
      io.emit('notificacaoAlteracaoDeVaga', msg);
    } catch (error) {
      console.error('Erro de validação Alteração de Vaga:', error.errors);
    }
  });

  socket.on('notificacaoExcluirVaga', (mensagem) => {
    try {
      const validatedData = ExcluirVagaSchema.parse(mensagem);
      
      const msg = {
        id: validatedData.id,
        idClient: socket.id,
        data: new Date().toISOString()
      };

      console.log('Mensagem validada - Excluir Vaga:', msg);
      io.emit('notificacaoExcluirVaga', msg);
    } catch (error) {
      console.error('Erro de validação Excluir Vaga:', error.errors);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Cliente desconectado:', socket.id, 'Razão:', reason, 'em:', new Date().toISOString());
  });

  socket.on('error', (error) => {
    console.error('Erro no socket:', socket.id, error);
  });
});

httpServer.listen(5004, () => {
  console.log('Socket.IO ouvindo em http://localhost:5004');
});
