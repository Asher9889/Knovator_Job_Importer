import { Request, Response } from "express";
import { jobService } from "../services";
import { jobFeedAPIs, shapeRawData, normalizedData, jobQueue } from "../utils";
import { StatusCodes } from "http-status-codes";

async function fetchJobAndQueue(req: Request, res: Response) {
    try {
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
                await jobQueue.add("job-upsert", job);
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