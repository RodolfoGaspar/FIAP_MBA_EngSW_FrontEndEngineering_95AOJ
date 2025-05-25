import { AppBar, TitlePortal, useRedirect } from 'react-admin';
import { Box, Typography } from '@mui/material';

const blue = '#2176ae'; // Cor azul do logo SmartPark

const CustomAppBar = (props: any) => {
  const redirect = useRedirect();

  return (
    <AppBar {...props} sx={{ backgroundColor: blue, boxShadow: 2 }}>
      <Box display="flex" alignItems="center" height="100%" px={2} width="100%">
        {/* Logo estilizado (substitua por <img src={logo} ... /> se tiver o arquivo) */}
        <Box
          display="flex"
          alignItems="center"
          mr={2}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={() => redirect('/vagas')}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              background: '#fff',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
            }}
          >
            <Typography variant="h5" sx={{ color: blue, fontWeight: 900, fontFamily: 'Montserrat, Roboto, sans-serif' }}>
              P
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontFamily: 'Montserrat, Roboto, sans-serif',
              letterSpacing: 1,
            }}
          >
            SmartPark
          </Typography>
        </Box>
        {/* Título da página ao lado da logo */}
        <TitlePortal />
        {/* Espaço flexível para empurrar os ícones para a direita */}
        <Box flexGrow={1} />
        {/* Aqui ficam os ícones padrão do react-admin (refresh, tema, etc) */}
      </Box>
    </AppBar>
  );
};

export default CustomAppBar; 