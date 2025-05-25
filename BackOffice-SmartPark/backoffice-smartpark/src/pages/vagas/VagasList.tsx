import {
  List,
  Datagrid,
  FunctionField,
  EditButton,
  DeleteButton,
} from "react-admin";
import StatusVagaChip from "../../components/StatusVagaChip";
import TipoVagaField from "../../components/TipoVagaField";
import { Paper, Typography, Box } from "@mui/material";

const blue = '#2176ae';

export const VagasList = () => (
  <List>
    <Box sx={{ width: '100%', padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, background: '#fff', borderRadius: 3 }}>
        <Typography variant="h5" sx={{ color: blue, fontWeight: 700, mb: 2, fontFamily: 'Montserrat, Roboto, sans-serif' }}>
          Vagas Cadastradas
        </Typography>
        <Datagrid rowClick="show">
          <FunctionField
            label="Estacionamento"
            source="idEstacionamento"
            render={(record) => `${record.idEstacionamento?.slice(0, 8)}...`}
          />
          <FunctionField
            label="ID"
            source="id"
            render={(record) => `${record.id?.slice(0, 8)}...`}
          />
          <FunctionField
            label="Tipo"
            source="tipoVagaDescricao"
            render={(record) => (
              <TipoVagaField tipoVaga={record.tipoVagaDescricao} />
            )}
          />
          <FunctionField
            label="Status"
            source="statusDescricao"
            render={(record) => <StatusVagaChip status={record.statusDescricao} />}
          />
          <FunctionField
            label="Valor/Hora"
            source="valorHora"
            render={(record) => (
              <Typography variant="body2" sx={{ color: blue, fontWeight: 600 }}>
                R${record.valorHora},00
              </Typography>
            )}
          />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </Paper>
    </Box>
  </List>
);
