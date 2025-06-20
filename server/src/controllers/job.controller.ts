import { Request, Response } from "express";
import { jobService } from "../services";
import { jobFeedAPIs, shapeRawData, normalizedData } from "../utils";

async function fetchJobAndQueue(req: Request, res: Response) {
    try {
      
        for(let api of jobFeedAPIs){
            const jsonData = await jobService.fetchJob(api);
            const rawData = shapeRawData(jsonData);
            const source = api.fullURL || api.baseURL || "unknown";
            const normalizedJobs = rawData.map(data => normalizedData(data, source));
        }
    } catch (error) {

    }
}