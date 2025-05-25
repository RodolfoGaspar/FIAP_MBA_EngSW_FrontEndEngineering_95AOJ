import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";
import useBuscaTipoVaga from "../../api/hooks/useBuscaTipoVaga";
import useBuscaStatus from "../../api/hooks/useBuscaStatus";
import { Grid, Typography, Paper, Box } from "@mui/material";
import useBuscaEstacionamentos from "../../api/hooks/useBuscaEstacionamentos";
import { required, number } from "react-admin";

export const VagasCreate = () => {
  const { data, loading, error } = useBuscaStatus();
  const {
    data: tipo,
    loading: loadingTipo,
    error: errorTipo,
  } = useBuscaTipoVaga();
  const {
    data: estacionamentos,
    loading: loadingEstacionamento,
    error: errorEstacionamento,
  } = useBuscaEstacionamentos();

  if (error || errorTipo || errorEstacionamento) return <p>Erro: {error}</p>;

  return (
    <Create>
      <SimpleForm>
        <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, color: "primary.main" }}
          >
            Informações da Vaga
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SelectInput
                fullWidth
                source="status"
                label="Status da Vaga"
                disabled={loading}
                choices={data?.map((status) => ({
                  id: status.id,
                  name: status.name,
                }))}
                optionText="name"
                optionValue="id"
                validate={required()}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectInput
                fullWidth
                source="tipos"
                label="Tipo de Vaga"
                disabled={loadingTipo}
                choices={tipo?.map((status) => ({
                  id: status.id,
                  name: status.name,
                }))}
                optionText="name"
                optionValue="id"
                validate={required()}
              />
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            sx={{ marginBottom: 2, color: "primary.main" }}
          >
            Configurações Financeiras e Localização
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextInput
                type="number"
                fullWidth
                source="valorHora"
                label="Valor por Hora (R$)"
                validate={[required(), number()]}
                sx={{ "& input": { textAlign: "right" } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectInput
                fullWidth
                source="idEstacionamento"
                label="Estacionamento"
                disabled={loadingEstacionamento}
                choices={estacionamentos?.map((estacionamento) => ({
                  id: estacionamento.id,
                  name: estacionamento.nome,
                }))}
                optionText="name"
                optionValue="id"
                validate={required()}
              />
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Create>
  );
};
