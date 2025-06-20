import { Request, Response } from "express";
import { jobService } from "../services";
import { jobFeedAPIs, shapeRawData, normalizedData, jobQueue } from "../utils";
import { StatusCodes } from "http-status-codes";
import { ImportLog } from "../models";
import { v4 as uuidv4 } from "uuid";


async function fetchJobAndQueue(req: Request, res: Response) {
    try {
        const importId = uuidv4() // for uniquely identifying one batch
        let total = 0;
        for (let api of jobFeedAPIs) {
            const data = await jobService.fetchJob(api);
            // console.log("data is:", data)
            const rawData = shapeRawData(data);
            const source = api.fullURL || api.baseURL || "unknown";
            const normalizedJobs = rawData.map(data => normalizedData(data, source));

           

            // console.log("normalizedJobs: ", normalizedJobs.slice(0,2))

            // Push to queue
            for (const job of normalizedJobs) {
                try {
                    await jobQueue.add("job-upsert", { ...job, importId }); // passing to worker so that can save its
                    console.log("📦 Job pushed to queue:", job.jobId);
                } catch (error: any) {
                   console.log(error)
                }

            }

            total += normalizedJobs.length;
        }
        return res.status(StatusCodes.OK).json({
            message: "Jobs fetched & queued",
            total: total,
        });
    } catch (error) {
        console.log(error);
    }
}

export { fetchJobAndQueue }