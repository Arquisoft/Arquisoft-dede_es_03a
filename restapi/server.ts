import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { json } from 'body-parser';
import { productRouter } from './routes/ProductRoutes';
import cors from "cors";

const options: cors.CorsOptions = {

  origin: ["http://localhost:3000"],

};

const app = express()
app.use(json())
app.use(productRouter)

app.use(cors(options));

mongoose.connect('mongodb+srv://admin:admin1234@dede-es3a.thyhc.mongodb.net/dede?retryWrites=true&w=majority', () => {
  console.log('connected to database')
})

app
  .listen(5000, (): void => {
    console.log("Restapi listening on " + 5000);
  })
  .on("error", (error: Error) => {
    console.error("Error occured: " + error.message);
  });
