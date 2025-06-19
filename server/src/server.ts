import express, { Response } from "express";
import config from "./config";
import connectMongoDB from "./db/connectMongoDB";
import { globalErrorHandler } from "./middlewares";
import apiRoutes from "./routes"
connectMongoDB()

const app = express();

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true}));


app.use("/api", apiRoutes)

app.use(globalErrorHandler as any);

app.listen(config.port, ()=>{
    console.log(`App is listening from port ${config.port}`)
})