import { RedisOptions } from "ioredis";

import config from ".";

const redisConfig: RedisOptions = {
    host: config.redisHost || "127.0.0.1",
    port: config.redisPort || 6379,
};


export { redisConfig }