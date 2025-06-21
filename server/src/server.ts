import express from "express";
import connectMongoDB from "./db/connectMongoDB";
import startHTTPServer from "./http";
import startSocketServer from "./socketHandler";

connectMongoDB();

const app = express();

startHTTPServer(app);

startSocketServer(app);



