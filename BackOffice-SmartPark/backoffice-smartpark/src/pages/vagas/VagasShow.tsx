import { Show, SimpleShowLayout, FunctionField, Labeled } from "react-admin";
import StatusVagaChip from "../../components/StatusVagaChip";
import TipoVagaField from "../../components/TipoVagaField";
import { Grid, Paper, Typography, Box, Divider } from "@mui/material";

const blue = "#2176ae";

export const VagasShow = () => (
  <Show>
    <SimpleShowLayout>
      <Box sx={{ maxWidth: 700, margin: "0 auto", padding: 2 }}>
        <Typography
          variant="h5"
          sx={{
            color: blue,
            fontWeight: 700,
            mb: 2,
            fontFamily: "Montserrat, Roboto, sans-serif",
          }}
        >
          Detalhes da Vaga
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Labeled label="ID Estacionamento">
              <FunctionField
                source="idEstacionamento"
                render={(record) => `${record.idEstacionamento}`}
              />
            </Labeled>
          </Grid>
          <Grid item xs={12} md={6}>
            <Labeled label="ID">
              <FunctionField source="id" render={(record) => `${record.id}`} />
            </Labeled>
          </Grid>
          <Grid item xs={12} md={6}>
            <Labeled label="Status">
              <FunctionField
                source="statusDescricao"
                render={(record) => (
                  <StatusVagaChip status={record.statusDescricao} />
                )}
              />
            </Labeled>
          </Grid>
          <Grid item xs={12} md={6}>
            <Labeled label="Tipo da Vaga">
              <FunctionField
                source="tipoVagaDescricao"
                render={(record) => (
                  <TipoVagaField tipoVaga={record.tipoVagaDescricao} />
                )}
              />
            </Labeled>
          </Grid>
          <Grid item xs={12} md={6}>
            <Labeled label="Valor por Hora">
              <FunctionField
                source="valorHora"
                render={(record) => (
                  <Typography
                    variant="body1"
                    sx={{ color: blue, fontWeight: 600 }}
                  >
                    R${record.valorHora},00
                  </Typography>
                )}
              />
            </Labeled>
          </Grid>
        </Grid>
      </Box>
    </SimpleShowLayout>
  </Show>
);
