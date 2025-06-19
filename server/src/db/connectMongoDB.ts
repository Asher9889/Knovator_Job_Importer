import mongoose from "mongoose";
import config from "../config";

async function connectMongoDB(){
   try {
        const connection = await mongoose.connect(config.mongoDBURL)
   } catch (error) {
        console.log("error is", error)
   }
}

mongoose.connection.on("connecting", ()=>{
    console.log("Mongoose trying to connect.")
})

mongoose.connection.on("connected", ()=>{
    console.log("Mongoose connected to database.")
})

mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose disconnected.");
  });

process.on("SIGINT", async ()=>{
    await mongoose.connection.close();
    console.log("🛑 Mongoose connection closed due to app termination.");
    process.exit(0);
})