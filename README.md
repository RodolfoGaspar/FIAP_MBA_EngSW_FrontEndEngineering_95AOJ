# SmartPark - Sistema de Gerenciamento de Estacionamentos

Este repositório contém as APIs, serviços e frontend que compõem o sistema SmartPark, uma solução completa para gerenciamento de estacionamentos.

## 🚀 Tecnologias Utilizadas

### Backend
- .NET 6.0
- Entity Framework Core
- SQLite
- WebSocket
- Swagger
- Docker

### Frontend
- React.js
- TypeScript
- Material-UI (MUI)
- Socket.IO Client
- Axios
- React Router
- React Query

## 📋 Pré-requisitos

### Backend
- [.NET 6.0 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Docker](https://www.docker.com/products/docker-desktop) (opcional)
- [Postman](https://www.postman.com/downloads/) (para testes)
- [Visual Studio](https://visualstudio.microsoft.com/pt-br/) ou [VS Code](https://code.visualstudio.com/)

### Frontend
- [Node.js](https://nodejs.org/) (versão LTS)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🔧 Instalação e Execução Local

### 1. Clone o Repositório
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_REPOSITÓRIO]
```

### 2. Configuração do Backend

#### VagasAPI
```bash
cd VagasAPI
dotnet restore
dotnet build
dotnet run
```
- URL Local: http://localhost:5001
- Swagger: http://localhost:5001/swagger
- URL Produção: https://vagasapi-production.up.railway.app

#### PagamentosAPI
```bash
cd PagamentosAPI
dotnet restore
dotnet build
dotnet run
```
- URL Local: http://localhost:5002
- Swagger: http://localhost:5002/swagger
- URL Produção: https://pagamentosapi-production.up.railway.app

#### ReservasAPI
```bash
cd ReservasAPI
dotnet restore
dotnet build
dotnet run
```
- URL Local: http://localhost:5003
- Swagger: http://localhost:5003/swagger

#### WebSocket
```bash
cd WebSocket
npm install
npm start
```
- URL Local: http://localhost:5004
- URL Produção: https://smartparkwebsocket-production.up.railway.app

### 3. Configuração do Frontend

#### BackOffice-SmartPark
```bash
cd BackOffice-SmartPark
npm install
npm start
```
- URL Local: http://localhost:3000
- URL Produção: https://smartpark-frontend.vercel.app

## 🧪 Testes

### Backend

#### Via Swagger
1. Acesse a URL do Swagger de cada API conforme listado acima
2. Autentique-se (se necessário)
3. Teste os endpoints disponíveis

#### Via Postman
1. Importe a coleção do Postman localizada em `/Postman`
2. Configure as variáveis de ambiente:
   - `base_url_vagas`: https://vagasapi-production.up.railway.app
   - `base_url_pagamentos`: https://pagamentosapi-production.up.railway.app
   - `base_url_reservas`: https://reservasapi-production.up.railway.app
   - `websocket_url`: https://smartparkwebsocket-production.up.railway.app

### Frontend

#### Testes Unitários
```bash
cd BackOffice-SmartPark
npm test
```

#### Testes E2E (Cypress)
```bash
cd BackOffice-SmartPark
npm run cypress:open
```

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
- Testes unitários com Jest
- Testes E2E com Cypress

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
