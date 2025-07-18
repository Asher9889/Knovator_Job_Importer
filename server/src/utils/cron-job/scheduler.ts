import cron from "node-cron";
import connectMongoDB from "../../db/connectMongoDB";
import { fetchAndQueueJobs as fetchAllJobsAndAddToQueue } from "../helpers/fetchJobAndQueue";

async function initiateCronJob() {
    try {
        await connectMongoDB();
        cron.schedule("*/3 * * * *", async () => { // Every 3 minutes, Every hour, Every day of month, Every month, Every day of week
            console.log("⏰ Cron job triggered...");
            await fetchAllJobsAndAddToQueue();
        });
    } catch (err) {
        console.error("❌ Initialization failed:", err);
        process.exit(1);
    }
}

initiateCronJob();

