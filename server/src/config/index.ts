import dotenv from 'dotenv';
dotenv.config();

type Config = {
    portHTTP: number;
    portWebSocket: number;
    mongoDBURL: string;
    dbName: string;
    redisHost: string;
    redisPort: number;
}


const config:Config = {
    portHTTP: Number(process.env.PORT_HTTP),
    portWebSocket: Number(process.env.PORT_WEB_SOCKET),
    mongoDBURL: String(process.env.MONGODB_URL),
    dbName: String(process.env.DB_NAME),
    redisHost: String(process.env.REDIS_HOST),
    redisPort: Number(process.env.REDIS_PORT)
}


export default config;