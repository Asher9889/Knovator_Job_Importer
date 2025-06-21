import { Server } from "socket.io";
import http from "http";


function startSocketServer(app: any) {
    try {
        const server = http.createServer(app);
        const io = new Server(server);
    } catch (error) {

    }

}

export default startSocketServer;