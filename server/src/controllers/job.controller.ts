import { Request, Response } from "express";
import { jobService } from "../services";
import { jobFeedAPIs, shapeRawData, normalizedData, jobQueue } from "../utils";

async function fetchJobAndQueue(req: Request, res: Response) {
    try {
        let total = 0;
        for (let api of jobFeedAPIs) {
            const jsonData = await jobService.fetchJob(api);
            const rawData = shapeRawData(jsonData);
            const source = api.fullURL || api.baseURL || "unknown";
            const normalizedJobs = rawData.map(data => normalizedData(data, source));
            // Push to queue
            for (const job of normalizedJobs) {
                await jobQueue.add("job.upsert", job);
            }

            total += normalizedJobs.length;
        }
    } catch (error) {

    }
}