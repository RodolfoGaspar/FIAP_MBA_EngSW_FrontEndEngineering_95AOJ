# SmartPark - Sistema de Gerenciamento de Estacionamentos

## 📝 Resumo da Aplicação
O SmartPark é uma solução completa para gerenciamento de estacionamentos, oferecendo funcionalidades de controle de vagas, reservas e pagamentos em tempo real. O sistema permite o gerenciamento eficiente de vagas de estacionamento, com notificações em tempo real sobre disponibilidade, alterações e exclusões de vagas.

## 🔄 Fluxo de Comunicação

O diagrama abaixo representa o fluxo de dados entre os sistemas envolvidos:

- O **Front-end Web**, utilizado pelos estacionamentos parceiros, realiza chamadas de API para **criar, alterar ou excluir vagas**.
- O backend em **Node.js** processa essas requisições e emite notificações em tempo real usando **WebSocket**.
- O aplicativo mobile feito em **React Native** recebe essas notificações e atualiza a lista de vagas instantaneamente, sem a necessidade de recarregar.

![Fluxo do sistema](./assets/fluxo-smartpark.png)

## 🚀 Tecnologias Utilizadas

### Backend
- .NET 6.0
- Entity Framework Core
- SQLite
- WebSocket (Socket.IO)
- Swagger
- Docker

### Frontend
- React.js
- React Native
- TypeScript
- Material-UI (MUI)
- Socket.IO Client
- Axios
- React Query
- React Router

## 🔧 Instalação e Execução Local

### Pré-requisitos
- [.NET 6.0 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/) (versão LTS)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop) (opcional)

### Passos para Execução

#### 1. Clone o Repositório
```bash
git clone https://github.com/rodolfocruz/FIAP_MBA_EngSW_FrontEndEngineering_95AOJ.git
cd FIAP_MBA_EngSW_FrontEndEngineering_95AOJ
```
**App React Native**
```bash
https://github.com/ThomasWeyand/SmartParkUser.git
cd SmartParkUser
```

#### 2. Backend

##### VagasAPI
```bash
cd VagasAPI
dotnet restore
dotnet build
dotnet run
```
- URL Local: http://localhost:5001
- Swagger Local: http://localhost:5001/swagger
- URL Produção: https://vagasapi-production.up.railway.app
- Swagger Produção: https://vagasapi-production.up.railway.app/swagger

##### PagamentosAPI
```bash
cd PagamentosAPI
dotnet restore
dotnet build
dotnet run
```
- URL Local: http://localhost:5002
- Swagger Local: http://localhost:5002/swagger
- URL Produção: https://pagamentosapi-production.up.railway.app
- Swagger Produção: https://pagamentosapi-production.up.railway.app/swagger

##### ReservasAPI
```bash
cd ReservasAPI
dotnet restore
dotnet build
dotnet run
```
- URL Local: http://localhost:5003
- Swagger Local: http://localhost:5003/swagger
- URL Produção: https://reservasapi-production-4e97.up.railway.app
- Swagger Produção: https://reservasapi-production-4e97.up.railway.app/swagger

##### WebSocket
```bash
cd WebSocket
npm install
npm start
```
- URL Local: http://localhost:5004
- URL Produção: https://smartparkwebsocket-production.up.railway.app

#### 3. Frontend

##### BackOffice-SmartPark
```bash
cd BackOffice-SmartPark
npm install
npm start
```
- URL Local: http://localhost:3000
- URL Produção: https://smartpark-frontend.vercel.app

## 🌐 Links da Aplicação

### Frontend
- Produção: https://backoffice-smartpark-v1.vercel.app/#/vagas

### Frontend React Native App (user side)
- https://github.com/ThomasWeyand/SmartParkUser
- Documentaçao para build e run do projeto
- **app que consome as notificações emitidas via Web Socket**

### Backend
- VagasAPI: https://vagasapi-production.up.railway.app
- PagamentosAPI: https://pagamentosapi-production.up.railway.app
- ReservasAPI: https://reservasapi-production-4e97.up.railway.app
- WebSocket: https://smartparkwebsocket-production.up.railway.app

### Documentação (Swagger)
- VagasAPI: https://vagasapi-production.up.railway.app/swagger
- PagamentosAPI: https://pagamentosapi-production.up.railway.app/swagger
- ReservasAPI: https://reservasapi-production-4e97.up.railway.app/swagger

## 📋 Pré-requisitos

### Backend
- [Postman](https://www.postman.com/downloads/) (para testes)
- [Visual Studio](https://visualstudio.microsoft.com/pt-br/) ou [VS Code](https://code.visualstudio.com/)

### Frontend
- [Node.js](https://nodejs.org/) (versão LTS)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🧪 Testes

### Backend

#### Via Swagger
1. Acesse a URL do Swagger de cada API conforme listado acima
2. Autentique-se (se necessário)
3. Teste os endpoints disponíveis

#### Via Postman
1. Importe a coleção do Postman localizada em [Postman](https://smart-park-7334.postman.co/workspace/FIAP_95AOJ_FRONT~580660b0-422c-40a9-9bd4-89d0b5e84554/overview)
2. Configure as variáveis de ambiente:
   - `base_url_vagas`: https://vagasapi-production.up.railway.app
   - `base_url_pagamentos`: https://pagamentosapi-production.up.railway.app
   - `base_url_reservas`: https://reservasapi-production.up.railway.app
   - `websocket_url`: https://smartparkwebsocket-production.up.railway.app

## 📦 Endpoints Principais

### VagasAPI
- GET /v1/vagas - Lista todas as vagas
- GET /v1/vagas/{id} - Obtém uma vaga específica
- POST /v1/vagas - Cria uma nova vaga
- PUT /v1/vagas - Atualiza uma vaga
- DELETE /v1/vagas/{id} - Remove uma vaga

### PagamentosAPI
- GET /v1/pagamentos - Lista todos os pagamentos
- GET /v1/pagamentos/{id} - Obtém um pagamento específico
- POST /v1/pagamentos - Cria um novo pagamento
- PUT /v1/pagamentos - Atualiza um pagamento
- DELETE /v1/pagamentos/{id} - Remove um pagamento

### ReservasAPI
- GET /v1/reservas - Lista todas as reservas
- GET /v1/reservas/{id} - Obtém uma reserva específica
- POST /v1/reservas - Cria uma nova reserva
- PUT /v1/reservas - Atualiza uma reserva
- DELETE /v1/reservas/{id} - Remove uma reserva

### WebSocket
- Evento: notificacaoNovaVaga
- Evento: notificacaoAlteracaoDeVaga
- Evento: notificacaoExcluirVaga

## 🔄 Fluxo de Dados

1. O sistema de vagas (VagasAPI) gerencia a disponibilidade das vagas
2. O sistema de reservas (ReservasAPI) permite que usuários reservem vagas
3. O sistema de pagamentos (PagamentosAPI) processa os pagamentos das reservas
4. O WebSocket mantém todos os clientes atualizados sobre mudanças em tempo real
5. O frontend (BackOffice-SmartPark) fornece uma interface amigável para gerenciar todas essas operações

## 🐳 Docker

### Backend
```bash
# VagasAPI
docker build -t vagasapi .
docker run -p 5001:5001 vagasapi

# PagamentosAPI
docker build -t pagamentosapi .
docker run -p 5002:5002 pagamentosapi

# ReservasAPI
docker build -t reservasapi .
docker run -p 5003:5003 reservasapi

# WebSocket
docker build -t websocket .
docker run -p 5004:5004 websocket
```

### Frontend
```bash
# BackOffice-SmartPark
cd BackOffice-SmartPark
docker build -t smartpark-frontend .
docker run -p 3000:3000 smartpark-frontend
```

## 📝 Notas Adicionais

### Backend
- Todas as APIs utilizam SQLite como banco de dados
- Os dados são persistidos localmente em arquivos .db
- O WebSocket utiliza Socket.IO para comunicação em tempo real
- Todas as APIs possuem documentação Swagger
- O CORS está configurado para permitir requisições de qualquer origem

### Frontend
- Interface responsiva com Material-UI
- Gerenciamento de estado com React Query
- Comunicação em tempo real com Socket.IO
- Roteamento com React Router

