import { Worker } from "bullmq";
// import { bullMQConnection } from "../config/redis";
import { Job } from "../../models";
import { redisConfig } from "../../config/redis";

interface JobPayload {
    source: string;
    jobId: string;
    title: string;
    description: string;
    company: string;
    location: string;
    url: string;
    postedAt: Date;
}

const jobWorker = new Worker<JobPayload>(
    "job-import-queue",
    async (job) => {
      if (job.name === "job-upsert") {
        const data = job.data;

        console.log("data inside worker", data)
  
        const existing = await Job.findOne({ jobId: data.jobId });
  
        if (existing) {
          await Job.updateOne({ jobId: data.jobId }, {$set: data});
          console.log(`🔁 Job updated: ${data.jobId}`);
        } else {
          await Job.create(data);
          console.log(`✅ Job inserted: ${data.jobId}`);
        }
      }
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
