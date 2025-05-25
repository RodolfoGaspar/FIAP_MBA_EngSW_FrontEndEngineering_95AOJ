import { Show, SimpleShowLayout, FunctionField, Labeled } from "react-admin";
import { Grid, Paper, Typography, Box, Divider } from "@mui/material";
import MetodoPagamentoChip from "../../components/MetodoPagamentoChip";
import StatusPagamentoChip from "../../components/StatusPagamentoChipProps ";

const blue = '#2176ae';

export const PagamentoShow = () => (
  <Show>
    <SimpleShowLayout>
      <Box sx={{ maxWidth: 700, margin: '0 auto', padding: 2 }}>
        <Paper elevation={3} sx={{ padding: 4, background: '#fff', borderRadius: 3 }}>
          <Typography variant="h5" sx={{ color: blue, fontWeight: 700, mb: 2, fontFamily: 'Montserrat, Roboto, sans-serif' }}>
            Detalhes do Pagamento
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Labeled label="ID do Pagamento">
                <FunctionField
                  source="id"
                  render={(record) => `${record.id}`}
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} md={6}>
              <Labeled label="ID da Reserva">
                <FunctionField
                  source="idReserva"
                  render={(record) => `${record.idReserva}`}
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} md={6}>
              <Labeled label="ID do Usuário">
                <FunctionField
                  source="idUsuario"
                  render={(record) => `${record.idUsuario}`}
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} md={6}>
              <Labeled label="Método de Pagamento">
                <FunctionField
                  source="metodoPagamento"
                  render={(record) => (
                    <MetodoPagamentoChip metodoPagamento={record.metodoPagamento} />
                  )}
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} md={6}>
              <Labeled label="Status do Pagamento">
                <FunctionField
                  source="statusPagamento"
                  render={(record) => (
                    <StatusPagamentoChip statusPagamento={record.statusPagamento} />
                  )}
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} md={6}>
              <Labeled label="Valor">
                <FunctionField
                  source="valor"
                  render={(record) => (
                    <Typography variant="body1" sx={{ color: blue, fontWeight: 600 }}>
                      R$ {record.valor},00
                    </Typography>
                  )}
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} md={6}>
              <Labeled label="Criado Em">
                <FunctionField
                  source="criadoEm"
                  render={(record) => new Date(record.criadoEm).toLocaleString()}
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} md={6}>
              <Labeled label="Alterado Em">
                <FunctionField
                  source="alteradoEm"
                  render={(record) =>
                    record.alteradoEm
                      ? new Date(record.alteradoEm).toLocaleString()
                      : "N/A"
                  }
                />
              </Labeled>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </SimpleShowLayout>
  </Show>
);
