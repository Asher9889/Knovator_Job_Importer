import { Worker } from "bullmq";
// import { bullMQConnection } from "../config/redis";
import { ImportLog, Job } from "../../models";
import { redisConfig } from "../../config/redis";
import connectMongoDB from "../../db/connectMongoDB";

interface JobPayload {
  importId: string;
  source: string;
  jobId: string;
  title: string;
  description: string;
  company: string;
  location: string;
  url: string;
  postedAt: Date;
}
connectMongoDB();

const totalJobTracker = new Map<
  string,
  {
    totalFetched: number;
    newJobs: number;
    updatedJobs: number;
    failedJobs: { jobId: string; reason: string }[];
    timer?: NodeJS.Timeout;
  }
>();


const jobWorker = new Worker<JobPayload>( // consumer for queue "job-upsert"
  "job-upsert",
  async (job) => {

    try {
      const data = job.data;
      const importId = data.importId;

      if (!totalJobTracker.has(importId)) {
        totalJobTracker.set(importId, {
          totalFetched: 0,
          newJobs: 0,
          updatedJobs: 0,
          failedJobs: [],
        });
      }
      const tracker = totalJobTracker.get(importId)!;
      tracker.totalFetched++;



      const existing = await Job.findOne({ jobId: data.jobId });

      try {
        if (existing) {
          await Job.updateOne({ jobId: data.jobId }, { $set: data });
          tracker.updatedJobs++;
        } else {
          await Job.create(data);
          tracker.newJobs++;
          console.log(`✅ Job inserted: ${data.jobId}`);
        }
      } catch (error: any) {
        tracker.failedJobs.push({ jobId: data.jobId, reason: error.message });
      }

      if (tracker.timer) clearTimeout(tracker.timer);

      /**
       * Job 1 received → setTimeout(5s)
           ↑ (timer ticking...)
      
      Job 2 (after 2s) → clearTimeout() + new setTimeout(5s)
           ↑ (timer resets...)
      
      Job 3 (after 2s) → clearTimeout() + new setTimeout(5s)
           ↑ (timer resets...)
      
      ...No more jobs...
      
      ⏳ 5 seconds pass → setTimeout fires → insert ImportLog into DB
       */

      tracker.timer = setTimeout(async () => {
        console.log(`📝 Flushing import log for ${importId}`);
        await ImportLog.create({
          importId,
          timestamp: new Date(),
          // source: data.source,
          totalFetched: tracker.totalFetched,
          totalImported: (tracker.updatedJobs || 0) + (tracker.newJobs || 0),
          newJobs: tracker.newJobs,
          updatedJobs: tracker.updatedJobs,
          failedJobs: tracker.failedJobs,
        });

        totalJobTracker.delete(importId);
      }, 5000);


    } catch (error) {
      console.log("error is:", error)
    }
    // }
  },
  {
    connection: redisConfig,
  }
);


jobWorker.on("completed", (job) => {
  console.log(`🎉 Job completed: ${job.id}`);
});

jobWorker.on("failed", (job, err) => {
  console.error(`❌ Job failed: ${job?.id}`, err.message);
});
