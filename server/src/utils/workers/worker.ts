import { Worker } from "bullmq";
// import { bullMQConnection } from "../config/redis";
import JobModel from "../../models/job";
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
      if (job.name === "job.upsert") {
        const data = job.data;
  
        const existing = await JobModel.findOne({ jobId: data.jobId });
  
        if (existing) {
          await JobModel.updateOne({ jobId: data.jobId }, data);
          console.log(`🔁 Job updated: ${data.jobId}`);
        } else {
          await JobModel.create(data);
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
