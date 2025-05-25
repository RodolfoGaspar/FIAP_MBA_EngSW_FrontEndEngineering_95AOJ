import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
} from "react-admin";
import { Grid, Typography, Paper, Box } from "@mui/material";
import useBuscaMetodoPagamento from "../../api/hooks/useBuscaMetodoPagamento";
import useBuscaStatusPagamento from "../../api/hooks/useBuscaStatusPagamento";
import useBuscaReservas from "../../api/hooks/useBuscaReservas";
import { required, number } from "react-admin";

export const PagamentosEdit = () => {
  const {
    data: metodoPagamentoData,
    loading: loadingMetodoPagamento,
    error: errorMetodoPagamento,
  } = useBuscaMetodoPagamento();

  const {
    data: statusPagamentoData,
    loading: loadingStatusPagamento,
    error: errorStatusPagamento,
  } = useBuscaStatusPagamento();

  const {
    data: reservasData,
    loading: loadingReservas,
    error: errorReservas,
  } = useBuscaReservas();

  if (errorMetodoPagamento || errorStatusPagamento || errorReservas)
    return (
      <p>
        Erro: {errorMetodoPagamento || errorStatusPagamento || errorReservas}
      </p>
    );

  return (
    <Edit>
      <SimpleForm>
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
          <Paper elevation={2} sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2, color: 'primary.main' }}>
              Informações do Pagamento
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextInput
                  fullWidth
                  source="idUsuario"
                  label="ID do Usuário"
                  InputProps={{ readOnly: true }}
                  validate={required()}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectInput
                  fullWidth
                  source="metodoPagamento"
                  label="Método de Pagamento"
                  disabled={loadingMetodoPagamento}
                  choices={metodoPagamentoData?.map((metodo) => ({
                    id: metodo.id,
                    name: metodo.name,
                  }))}
                  optionText="name"
                  optionValue="id"
                  validate={required()}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={2} sx={{ padding: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2, color: 'primary.main' }}>
              Detalhes do Pagamento
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SelectInput
                  fullWidth
                  source="statusPagamento"
                  label="Status do Pagamento"
                  disabled={loadingStatusPagamento}
                  choices={statusPagamentoData?.map((status) => ({
                    id: status.id,
                    name: status.name,
                  }))}
                  optionText="name"
                  optionValue="id"
                  validate={required()}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <NumberInput 
                  fullWidth 
                  source="valor" 
                  label="Valor (R$)"
                  validate={[required(), number()]}
                  sx={{ '& input': { textAlign: 'right' } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectInput
                  fullWidth
                  source="idReserva"
                  label="ID da Reserva"
                  disabled={loadingReservas}
                  choices={reservasData?.map((reserva) => ({
                    id: reserva.id,
                    name: reserva.id,
                  }))}
                  optionText="name"
                  optionValue="id"
                  validate={required()}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </SimpleForm>
    </Edit>
  );
};
