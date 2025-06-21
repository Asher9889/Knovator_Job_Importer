import cors from "cors";
import express, { Application } from "express";
import apiRoutes from "./routes"
import { globalErrorHandler } from "./middlewares";
import config from "./config";

function startHTTPServer(app:Application) {
    try {

        app.use(cors({
            origin: "*"
        }))

        app.use(express.json({ limit: "5mb" }));
        app.use(express.urlencoded({ extended: true }));


        app.use("/api", apiRoutes)

        app.use(globalErrorHandler as any);

        app.listen(config.portHTTP, () => {
            console.log(`App is listening from port ${config.portHTTP}`)
        })
    } catch (error) {
        console.log("Failed to start server: ", error);
    }
}


export default startHTTPServer;