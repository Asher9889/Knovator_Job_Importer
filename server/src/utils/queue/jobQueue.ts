import { Queue } from "bullmq";
import { redisConfig } from "../../config/redis";


const jobQueue = new Queue("job-upsert", {
  connection: redisConfig,
});

export default jobQueue;
