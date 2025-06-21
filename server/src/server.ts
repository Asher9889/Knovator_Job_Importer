import express, { Application } from "express";
import connectMongoDB from "./db/connectMongoDB";
import startHTTPServer from "./http";
import startSocketServer from "./socket";

connectMongoDB();

const app:Application = express();

startHTTPServer(app);

startSocketServer(app);



