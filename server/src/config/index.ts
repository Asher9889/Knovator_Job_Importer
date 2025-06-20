import dotenv from 'dotenv';
dotenv.config();

type Config = {
    port: number;
    mongoDBURL: string;
    dbName: string;
    redisHost: string;
    redisPort: number;
}


const config:Config = {
    port: Number(process.env.PORT || 5000),
    mongoDBURL: String(process.env.MONGODB_URL),
    dbName: String(process.env.DB_NAME),
    redisHost: String(process.env.REDIS_HOST),
    redisPort: Number(process.env.REDIS_PORT)
}


export default config;