import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Button,
  TextField,
  ListItem,
  Chip,
  Typography,
  Snackbar,
  InputLabel,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  Icon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import SmallButton from "../Elements/SmallButton";
import ArrowDown from "@mui/icons-material/ArrowDropDown";
import SmallDangerButton from "../Elements/SmallDangerButton";
import SmallGrayButton from "../Elements/SmallGrayButton";
import SelectList from "../Elements/Compuestos/SelectList";
import System from "../../Helpers/System";
import InputNumber from "../Elements/Compuestos/InputNumber";
import InputGeneric from "../Elements/Compuestos/InputGeneric";
import SelectRegion from "../Elements/Compuestos/SelectRegion";
import ImportarListaPrecio from "./ImportarListaPrecio";
import CrearListaPrecio from "./CrearListaPrecio";
import SearchProducts from "../Elements/Compuestos/SearchProducts";
import { Box } from "@mui/system";
import UNIDADES from "../../definitions/Unidades";
import SmallSecondaryButton from "../Elements/SmallSecondaryButton";

const VALOR_APLICAR = [
  "Aumento",
  "Descuento",
]

export default ({
  openDialog,
  setOpendialog = (x) => { }
}) => {


  const [selectedProduct, setSelectedProduct] = useState(null)

  const inputs = {
    aplica: useState(0),
    listaSelec: useState(-1),
    porcentaje: useState(0),
    monto: useState(0),
  }

  const validations = {
    aplica: useState(null),
    listaSelec: useState(null),
    porcentaje: useState(null),
    monto: useState(null),
  }

  const buscarUnidad = (idUnidad) => {
    var enc = null
    UNIDADES.forEach((unidad) => {
      if (unidad.idUnidad == idUnidad) {
        enc = unidad
      }
    })

    if (enc) {
      return enc.descripcion
    } else {
      return ""
    }
  }

  return (<Dialog open={openDialog} onClose={() => setOpendialog(false)} fullWidth maxWidth={"lg"}>
    <DialogTitle>Precios por unidades vendidas</DialogTitle>
    <DialogContent>

      <Grid container spacing={2}>

        {!selectedProduct && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <SearchProducts onProductSelect={(prod) => {
                  setSelectedProduct(prod)
                  console.log("prod", prod)
                }} />
              </Grid>
            </Grid>
          </Grid>
        )}

        {selectedProduct && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <SmallButton fullWidth textButton={"Cambiar producto"} actionButton={() => {
                  setSelectedProduct(null)
                }} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    padding: 2,
                    borderRadius: 2,
                    marginTop: 2,
                  }}
                >

                  <Typography variant="h6">Producto Seleccionado:</Typography>
                  <Table sx={{ border: "1px ", borderRadius: "8px" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Codigo</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Unidad Venta</TableCell>
                        <TableCell>Precio Costo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{selectedProduct.idProducto}</TableCell>
                        <TableCell>{selectedProduct.nombre}</TableCell>
                        <TableCell>{buscarUnidad(selectedProduct.unidad)}</TableCell>
                        <TableCell>${System.formatMonedaLocal(selectedProduct.precioCosto)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>


                </Box>
              </Grid>


              <Grid item xs={12} sm={12} md={12} lg={12}>
                <br /><br />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Table sx={{ border: "1px ", borderRadius: "8px" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Desde</TableCell>
                          <TableCell>Hasta</TableCell>
                          <TableCell>Valor</TableCell>
                          <TableCell>&nbsp;</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>10</TableCell>
                          <TableCell>${System.formatMonedaLocal(4000)}</TableCell>
                          <TableCell>

                            <SmallButton textButton={"Quitar"} actionButton={() => {
                              console.log("quitar")
                            }} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <br />
              <br />
              <br />
              <SmallSecondaryButton
                textButton={"Guardar cambios"} actionButton={() => {
                  console.log("quitar")
                }} />
              <SmallDangerButton
                textButton={"salir sin guardar"} actionButton={() => {
                  console.log("quitar")
                }} />
            </Grid>
          </Grid>
        )}


      </Grid>


    </DialogContent >



  </Dialog >);
};
