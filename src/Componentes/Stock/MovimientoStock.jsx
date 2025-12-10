import React, { useState, useContext, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { SelectedOptionsContext } from "../Context/SelectedOptionsProvider";
import InputNumber from "../Elements/Compuestos/InputNumber";
import SendingButton from "../Elements/SendingButton";
import System from "../../Helpers/System";
import SearchProducts from "../Elements/Compuestos/SearchProducts";
import { TextField, Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import User from "../../Models/User";
import Stock from "../../Models/Stock";
import SmallButton from "../Elements/SmallButton";
import InputName from "../Elements/Compuestos/InputName";
import ModalLogin from "../ScreenDialog/ModalLogin";

const MovimientoStock = ({
  onClose,
  product = null,
  onUpdate = (sentInfo) => { }
}) => {
  const {
    showLoading,
    hideLoading,
    showAlert,
    showMessage
  } = useContext(SelectedOptionsContext);

  var states = {
    cantidad: useState(""),
    entradaSalida: useState(""),
    descripcion: useState(""),
  }

  var validatorStates = {
    cantidad: useState(null),
    entradaSalida: useState(null),
    descripcion: useState(null),
  }

  const [selectedProduct, setSelectedProduct] = useState(null); // Para almacenar el producto seleccionado
  const [showLogin, setShowLogin] = useState(false); // Para almacenar el producto seleccionado

  const handleProductSelect = (product) => {
    // Actualizar el estado del stockSistema y almacenar el producto seleccionado
    setSelectedProduct(product)
    console.log("Producto seleccionado:", product);
    states.cantidad[1](1)
  };

  const handleSubmit = async () => {
    if (!System.allValidationOk(validatorStates, showMessage)) {
      return false
    }
    if (isNaN(states.cantidad[0])) {
      showMessage("Debe ingresar un valor en cantidad")
      return
    }

    if (!selectedProduct) {
      showMessage("Debe buscar un producto")
      return
    }
    // Validar antes de enviar

    var nuevaCantidad = parseFloat(selectedProduct.stockActual + 0)
    if (states.entradaSalida[0] == "entrada") {
      nuevaCantidad += parseFloat(states.cantidad[0])
    } else {
      nuevaCantidad -= parseFloat(states.cantidad[0])
    }

    var userInfo = User.getInstance().getFromSesion()
    var idUsuario = 0
    if (userInfo) {
      idUsuario = userInfo.codigoUsuario
    } else {
      setShowLogin(true)
      return
    }

    const data = {
      "tipoAjuste": states.entradaSalida[0].toUpperCase(),
      "observacion": states.descripcion[0].toUpperCase(),
      "idUsuario": idUsuario,
      "fechaIngreso": System.getInstance().getDateForServer(),
      "stockMovimientoConceptos": [
        {
          "cantidad": parseFloat(states.cantidad[0] + ""),
          "stockActual": parseFloat(selectedProduct.stockActual + 0),
          "stockAjustado": parseFloat(nuevaCantidad.toFixed(2)),
          "codProducto": selectedProduct.idProducto + ""
        }
      ]
    }


    console.log("Datos antes de enviar:", data)
    showLoading("Enviando...");
    Stock.movimientoEntradaSalida(
      data,
      (res) => {
        hideLoading();
        showMessage("realizado exitosamente");
        setTimeout(() => {
          onClose();
          onUpdate(data);
        }, 1000);
      },
      (error) => {
        hideLoading();
        showMessage(error);
      }
    );
  };

  useEffect(() => {
    if (product) {
      setSelectedProduct(product)
    }
  }, [product])

  return (
    <Paper elevation={16} square sx={{ padding: "2%" }}>
      <Grid container spacing={2}>

        <ModalLogin
          onSuccess={(userOk) => {
            User.getInstance().saveInSesion(userOk)
            setTimeout(() => {
              handleSubmit()
            }, 300);
          }}
          openDialog={showLogin}
          setOpenDialog={() => { setShowLogin(false) }}
        />


        <Grid item xs={12}>
          <h2>Movimiento stock {states.entradaSalida[0]}</h2>
        </Grid>
        <Grid item xs={12}>
          {/* SearchProducts ahora pasa el producto seleccionado */}
          {states.entradaSalida[0] && (
            <SearchProducts focus={states.entradaSalida[0] != ""} onProductSelect={handleProductSelect} />
          )}
        </Grid>
        {/* Mostrar detalles del producto seleccionado */}
        {selectedProduct && (
          <Grid item xs={12} sm={12} md={12} lg={12} >
            <Box sx={{
              border: '1px solid #ddd',
              padding: 2,
              borderRadius: 2,
            }}>
              <Typography variant="h6"> Producto Seleccionado:</Typography>
              <Typography>Nombre: {selectedProduct.nombre}</Typography>

              <Typography>Stock en sistema: {selectedProduct.stockActual}</Typography>
            </Box>
          </Grid>
        )}
        {/* Reemplazamos el TextField con el InputNumber para Stock Físico */}
        {states.entradaSalida[0] ? (
          <Grid item xs={12} sm={12} md={12} lg={12} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} >
                <InputNumber
                  inputState={states.cantidad}
                  validationState={validatorStates.cantidad}
                  withLabel={true}
                  isDecimal={true}
                  fieldName="cantidad"
                  label="Cantidad"
                  required={true}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} >
                <InputName
                  inputState={states.descripcion}
                  validationState={validatorStates.descripcion}
                  withLabel={true}
                  fieldName="descripcion"
                  label="Descripcion/Glosa"
                  required={true}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} md={6} lg={6} >
            <SmallButton textButton={"Entrada"} actionButton={() => {
              states.entradaSalida[1]("entrada")
            }} />
            <SmallButton textButton={"Salida"} actionButton={() => {
              states.entradaSalida[1]("salida")
            }} />
          </Grid>
        )}

        <Grid item xs={12}>
          {states.entradaSalida[0] && (
            <SendingButton
              textButton={states.entradaSalida[0] == "entrada" ? "Aplicar entrada" : "Aplicar salida"}
              actionButton={handleSubmit}
              sending={false}
              sendingText="Realizando..."
              style={{
                width: "50%",
                margin: "0 25%",
                backgroundColor: "#950198"
              }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovimientoStock;
