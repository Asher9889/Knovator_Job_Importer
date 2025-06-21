
import { jobService } from "../../services";
import { jobFeedAPIs, shapeRawData, normalizedData, jobQueue } from "../index";
import { v4 as uuidv4 } from "uuid";


async function fetchAndQueueJobs(): Promise<{ importId: string; total: number }> {
    const importId = uuidv4(); // For unique import run
    let total = 0;

    for (let api of jobFeedAPIs) {
        const data = await jobService.fetchJob(api);
        const rawData = shapeRawData(data);
        const source = api.fullURL || api.baseURL || "unknown";
        const normalizedJobs = rawData.map(data => normalizedData(data, source));

        for (const job of normalizedJobs) {
            await jobQueue.add("job-upsert", { ...job, importId });
        }

        total += normalizedJobs.length;
    }

    return { importId, total };
}

export { fetchAndQueueJobs };
