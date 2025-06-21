import { Server } from "socket.io";
import http from "http";
import config from "./config";
import { Application } from "express";
import mongoose from "mongoose";


function startSocketServer(app: Application) {
    try {
        const server = http.createServer(app);
        const io = new Server(server, {
            cors: {
              origin: "*", // or use exact origin: "http://localhost:3000"
              methods: ["GET", "POST"]
            }
          });
          


        io.on("connection", (socket) => {
            console.log(`A new User added ${socket.id}`);
        })


        const db = mongoose.connection;

        db.once("open", () => {
            console.log("🧩 MongoDB ChangeStream watching import_logs...");

            const importLogChangeStream = db.collection("import-logs").watch();

            importLogChangeStream.on("change", (change) => {
                if (change.operationType === "insert" || change.operationType === "update" ) {
                    const newLog = change.fullDocument;
                    console.log("📡 New import log inserted:", newLog);
                    // Emit to all connected clients
                    io.emit("import-logs-update", newLog);
                }
            });
        });


        server.listen(config.portWebSocket, () => {
            console.log(`WebSocket Server started on port ${config.portWebSocket}`)
        })
    } catch (error) {

    }

}

export default startSocketServer;