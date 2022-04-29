import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { productoRouter } from './rutas/productoRutas';
import { usuarioRouter } from './rutas/usuarioRutas';
import { pedidoRouter } from './rutas/pedidoRutas';
import "dotenv/config";

const app = express()
app.use(json())
app.use(cors())

app.use(productoRouter)
app.use(usuarioRouter)
app.use(pedidoRouter)

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Conectado a la base de datos MongoDB "))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

//Heroku asigna el puerto de forma dinámica. (process.env.PORT)
const PORT = process.env.PORT || 5000

app
  .listen(PORT, (): void => {
    console.log(`REST api escuchando en el puerto ${PORT}`);
  })
  .on("error", (error: Error) => {
    console.error("Error ocurrido: " + error.message);
  });
