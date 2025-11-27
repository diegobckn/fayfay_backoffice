import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Dialog } from '@mui/material';
import Add from '@mui/icons-material/Add';

import SideBar from '../Componentes/NavBar/SideBar.jsx';
import AsocCliente from '../Componentes/Card-Modal/AsocCliente.jsx';
import PreciosGenerales from '../Componentes/Card-Modal/PreciosGenerales.jsx';
import BoxBuscador from '../Componentes/Card-Modal/BoxBuscador.jsx';
import PreciosPorCategoria from '../Componentes/Card-Modal/PreciosPorCategoria.jsx';
import PreciosPorLista from '../Componentes/Card-Modal/PreciosPorLista.jsx';
import PreciosPorUnidadesVendidas from '../Componentes/Card-Modal/PreciosPorUnidadesVendidas.jsx';

export const defaultTheme = createTheme();

const AsigPrecios = () => {
  const [showPreciosPorLista, setShowPreciosPorLista] = useState(false);
  const [showPreciosPorUnidadesVendidas, setShowPreciosPorUnidadesVendidas] = useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Box
        sx={{
          display: 'flex',
          height: '100px'
        }}>
        <SideBar />
        <Button
          variant="outlined"
          sx={{
            my: 1,
            mx: 2,
          }}
          disabled={true}
          // startIcon={<Add />}
          onClick={() => {
            setShowPreciosPorLista(true)
          }}
        >
          Lista de precios
        </Button>

        <Button
          variant="outlined"
          sx={{
            my: 1,
            mx: 2,
          }}
          // startIcon={<Add />}
          onClick={() => {
            setShowPreciosPorUnidadesVendidas(true)
          }}
        >
          Precios Por niveles de unidades
        </Button>

        <Button
          variant="outlined"
          sx={{
            my: 1,
            mx: 2,
          }}
          // startIcon={<Add />}
          onClick={() => {
          }}
        >
          Precios Por clientes
        </Button>
      </Box>

      <PreciosPorLista openDialog={showPreciosPorLista} setOpendialog={setShowPreciosPorLista} />
      <PreciosPorUnidadesVendidas openDialog={showPreciosPorUnidadesVendidas} setOpendialog={setShowPreciosPorUnidadesVendidas} />
    </ThemeProvider>
  );
};

export default AsigPrecios;
