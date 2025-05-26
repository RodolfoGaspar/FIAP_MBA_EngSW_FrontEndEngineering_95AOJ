import axios from "axios";

export const apiVagas = axios.create({
  baseURL: `https://vagasapi-production.up.railway.app/v1`, // Ajuste para a porta correta no Docker
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiPagamentos = axios.create({
  baseURL: `https://pagamentosapi-production.up.railway.app/v1`, // Ajuste para a porta correta no Docker
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiReservas = axios.create({
  baseURL: `https://reservasapi-production-4e97.up.railway.app/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
