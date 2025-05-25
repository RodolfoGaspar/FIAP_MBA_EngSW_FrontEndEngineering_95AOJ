import {
  List,
  Datagrid,
  FunctionField,
  EditButton,
  DeleteButton,
} from "react-admin";
import MetodoPagamentoChip from "../../components/MetodoPagamentoChip";
import StatusPagamentoChip from "../../components/StatusPagamentoChipProps ";
import { Typography, Box } from "@mui/material";

const blue = "#2176ae";

export const PagamentosList = () => (
  <List>
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography
        variant="h5"
        sx={{
          color: blue,
          fontWeight: 700,
          mb: 2,
          fontFamily: "Montserrat, Roboto, sans-serif",
        }}
      >
        Pagamentos
      </Typography>
      <Datagrid rowClick="show">
        <FunctionField
          label="ID"
          source="id"
          render={(record) => `${record.id?.slice(0, 8)}...`}
        />
        <FunctionField
          label="Reserva"
          source="idReserva"
          render={(record) => `${record.idReserva?.slice(0, 8)}...`}
        />
        <FunctionField
          label="Usuário"
          source="idUsuario"
          render={(record) => `${record.idUsuario?.slice(0, 8)}...`}
        />
        <FunctionField
          label="Método"
          source="metodoPagamento"
          render={(record) => (
            <MetodoPagamentoChip metodoPagamento={record.metodoPagamento} />
          )}
        />
        <FunctionField
          label="Status"
          source="statusPagamento"
          render={(record) => (
            <StatusPagamentoChip statusPagamento={record.statusPagamento} />
          )}
        />
        <FunctionField
          label="Valor"
          source="valor"
          render={(record) => (
            <Typography variant="body2" sx={{ color: blue, fontWeight: 600 }}>
              R${record.valor},00
            </Typography>
          )}
        />
        <FunctionField
          label="Criado em"
          source="criadoEm"
          render={(record) => new Date(record.criadoEm).toLocaleString()}
        />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </Box>
  </List>
);
