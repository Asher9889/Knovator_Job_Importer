# 🚀 Knovator Job Importer (Full Stack App)

A real-time full-stack application to import jobs from external feeds every 1 hour, store them in MongoDB, and update the UI instantly using WebSockets and MongoDB Change Streams.

---

## 🧱 Tech Stack

- **Frontend**: Next.js, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB Atlas
- **Queue**: BullMQ + ioredis
- **Real-Time**: Socket.IO + MongoDB Change Stream
- **Cron**: node-cron
- **Others**: axios, cors, dotenv, http-status-codes, mongoose, uuid, xml2js


---

## 🔧 Setup Instructions

### ✅ 1. Clone the Repo

```bash
git clone https://github.com/asher9889/knovator_job_importer.git
cd knovator_job_importer

cd client
npm install

cd ../server
npm install

touch server/.env

Add these variables
PORT_HTTP=5000
PORT_WEBSOCKET=5001
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net
DB_NAME=knovator_db
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379

```

### ✅ 2. To Run the Project

- backend
```bash

cd server
npm run dev
npm run cron
npm run worker

```
- Frontend
```bash
npm run dev
```


## 📦 Directory Structure

asher9889-knovator_job_importer.git/
├── README.md                     # Project documentation
├── client/                      # Frontend (Next.js)
│   ├── README.md                # Frontend-specific instructions
│   ├── next.config.ts           # Next.js configuration
│   ├── package-lock.json        # Dependency lock file
│   ├── package.json             # Frontend dependencies & scripts
│   ├── postcss.config.mjs       # PostCSS config (for TailwindCSS)
│   ├── tsconfig.json            # TypeScript configuration
│   ├── .gitignore               # Ignore rules for Git
│   └── src/
│       └── app/                 # App Router (Next.js 13+)
│           ├── globals.css     # Global styles
│           ├── layout.tsx      # Root layout component
│           └── page.tsx        # Main UI page
│
└── server/                      # Backend (Express + WebSocket)
    ├── .env.sample              # Sample environment variables
    ├── package-lock.json        # Dependency lock file
    ├── package.json             # Backend dependencies & scripts
    ├── tsconfig.json            # TypeScript configuration
    └── src/
        ├── http.ts              # Initializes HTTP server
        ├── server.ts            # Main entry (starts both HTTP + WebSocket)
        ├── socketHandler.ts     # WebSocket setup and MongoDB change stream
        ├── config/              # App and Redis config
        │   ├── index.ts
        │   └── redis.ts
        ├── controllers/         # Route controllers
        │   ├── index.ts
        │   └── job.controller.ts
        ├── db/                  # MongoDB connection
        │   └── connectMongoDB.ts
        ├── middlewares/         # Global middlewares
        │   ├── globalErrorHandler.ts
        │   └── index.ts
        ├── models/              # Mongoose schemas
        │   ├── import_log.model.ts
        │   ├── index.ts
        │   └── job.model.ts
        ├── routes/              # Express route definitions
        │   ├── index.ts
        │   └── v1/
        │       ├── index.ts
        │       └── job.routes.ts
        ├── services/            # Business logic layer
        │   ├── index.ts
        │   └── job.service.ts
        └── utils/               # Helpers, queue, cron jobs
            ├── index.ts
            ├── api-response/    # API response classes
            │   ├── ApiErrorResponse.ts
            │   └── ApiSuccessResponse.ts
            ├── constants/       # Static URLs for APIs
            │   └── jobUrl.ts
            ├── cron-job/        # Cron scheduler
            │   └── scheduler.ts
            ├── helpers/         # Data transformation utilities
            │   ├── fetchJobAndQueue.ts
            │   ├── normalizedData.ts
            │   └── shapeRawData.ts
            ├── queue/           # BullMQ queue setup
            │   └── jobQueue.ts
            └── workers/         # BullMQ worker consumer
                └── worker.ts








## Things i have done:
| #  | Module                  | Task Description                                                       | Status        | Notes / Output Expected                      |
| -- | ----------------------- | ---------------------------------------------------------------------- | ------------- | -------------------------------------------- |
| 1  | 📁 Project Setup        | Create `/client` for Next.js and `/server` for Node.js                 | ⬜ Done | Folder structure created                     |
| 2  |                         | Initialize Git repo, setup `.env` files and basic README               | ⬜ Done | `.env`, `.gitignore`, README.md created      |
| 3  | 🧠 MongoDB              | Setup MongoDB Atlas project and connect Mongoose                       | ⬜ Done | Connection string tested                     |
| 4  |                         | Create `Job.js` schema/model                                           | ⬜ Done | Fields: jobId, title, description, etc.      |
| 5  |                         | Create `ImportLog.js` schema/model                                     | ⬜ Done | Fields: fileName, timestamp, stats, failures |
| 6  | 🌐 API Integration      | Build `fetchAndConvertXML.js` to get jobs from API and convert to JSON | ⬜ Done | Uses `axios` + `xml2js`                      |
| 7  |                         | Normalize API response and push jobs to queue                          | ⬜ Done | JSON job format matches MongoDB schema       |
| 8  |                         | Setup `node-cron` to run every hour                                    | ⬜ Done | Cron job working                             |
| 9  | 📦 Queue System         | Install and configure BullMQ with Redis                                | ⬜ Done | Redis client working                         |
| 10 |                         | Create and test `jobQueue.js`                                          | ⬜ Done | Queue initialized                            |
| 11 |                         | Create `worker.js` to process queue: insert/update jobs                | ⬜ Done | Job insert/update logic complete             |
| 12 |                         | Track counts: new, updated, failed                                     | ⬜ Done | Logged to `ImportLog` collection             |
| 13 | 🧪 API Routes (Backend) | Create `/api/import-logs` to get latest import history                 | ⬜ Done | Returns last 20 imports                      |
| 14 | 🌐 Admin UI (Next.js)   | Create page `/import-history`                                          | ⬜ Done | Route created                                |
| 15 |                         | Fetch logs using Axios from backend                                    | ⬜ Done | List of logs visible in UI                   |
| 16 |                         | Render table with columns: fileName, time, total, new, updated, failed | ⬜ Done | TailwindCSS or ChakraUI used                 |
| 17 |                         | Add loader/error UI states                                             | ⬜ Done | UX completed                                 |
| 18 | 🚀 Bonus Features       | Add retry logic with exponential backoff in worker                     | ⬜ Not Started  | Retry jobs 3 times                   |
| 19 |                         | Add real-time updates with Socket.IO or SSE                            | ⬜ Done | Optional: Live update logs                   |              
| 20 | 📄 Documentation        | Write `/docs/architecture.md` with diagram                             | ⬜ Done | Use Draw\.io or Excalidraw                   |
| 21 |                         | Finalize `README.md` with setup and running steps                      | ⬜ Done | Includes assumptions and setup commands      |
| 22 | 🚢 Deployment           | Deploy backend to Render / Railway                                     | ⬜ Not Started | Link available                        |
| 23 |                         | Deploy frontend to Vercel                                              | ⬜ Not Started | Vercel link working                   |
| 24 |                         | Use MongoDB Atlas and Redis Cloud in prod                              | ⬜ Not Started | Production services connected         |


## System Design:
[text](https://excalidraw.com/#json=hwIcZYdQyPK9f3RsHDJR6,ik-YIfI21Bsz1rvS1u-syg)