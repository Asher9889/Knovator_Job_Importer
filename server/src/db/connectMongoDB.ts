import mongoose from "mongoose";
import config from "../config";
import { StatusCodes } from "http-status-codes";
import { ApiErrorResponse } from "../utils";

async function connectMongoDB(): Promise<void> {
    try {
        const connection = await mongoose.connect(config.mongoDBURL + "/" + config.dbName);
        console.log(`Mongoose connected to ${connection.connection.name} database`)
    } catch (error: any) {
        const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        const msg = error.message;
        throw new ApiErrorResponse(statusCode, msg);
    }
}

mongoose.connection.on("connecting", () => {
    console.log("Mongoose trying to connect.")
})

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to database.")
})

mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose disconnected.");
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("🛑 Mongoose connection closed due to app termination.");
    process.exit(0);
})


export default connectMongoDB;