| #  | Module                  | Task Description                                                       | Status        | Notes / Output Expected                      |
| -- | ----------------------- | ---------------------------------------------------------------------- | ------------- | -------------------------------------------- |
| 1  | 📁 Project Setup        | Create `/client` for Next.js and `/server` for Node.js                 | ⬜ Not Started | Folder structure created                     |
| 2  |                         | Initialize Git repo, setup `.env` files and basic README               | ⬜ Not Started | `.env`, `.gitignore`, README.md created      |
| 3  | 🧠 MongoDB              | Setup MongoDB Atlas project and connect Mongoose                       | ⬜ Not Started | Connection string tested                     |
| 4  |                         | Create `Job.js` schema/model                                           | ⬜ Not Started | Fields: jobId, title, description, etc.      |
| 5  |                         | Create `ImportLog.js` schema/model                                     | ⬜ Not Started | Fields: fileName, timestamp, stats, failures |
| 6  | 🌐 API Integration      | Build `fetchAndConvertXML.js` to get jobs from API and convert to JSON | ⬜ Not Started | Uses `axios` + `xml2js`                      |
| 7  |                         | Normalize API response and push jobs to queue                          | ⬜ Not Started | JSON job format matches MongoDB schema       |
| 8  |                         | Setup `node-cron` to run every hour                                    | ⬜ Not Started | Cron job working                             |
| 9  | 📦 Queue System         | Install and configure BullMQ with Redis                                | ⬜ Not Started | Redis client working                         |
| 10 |                         | Create and test `jobQueue.js`                                          | ⬜ Not Started | Queue initialized                            |
| 11 |                         | Create `worker.js` to process queue: insert/update jobs                | ⬜ Not Started | Job insert/update logic complete             |
| 12 |                         | Track counts: new, updated, failed                                     | ⬜ Not Started | Logged to `ImportLog` collection             |
| 13 | 🧪 API Routes (Backend) | Create `/api/import-logs` to get latest import history                 | ⬜ Not Started | Returns last 20 imports                      |
| 14 | 🌐 Admin UI (Next.js)   | Create page `/import-history`                                          | ⬜ Not Started | Route created                                |
| 15 |                         | Fetch logs using Axios from backend                                    | ⬜ Not Started | List of logs visible in UI                   |
| 16 |                         | Render table with columns: fileName, time, total, new, updated, failed | ⬜ Not Started | TailwindCSS or ChakraUI used                 |
| 17 |                         | Add loader/error UI states                                             | ⬜ Not Started | UX completed                                 |
| 18 | ⚙️ Configuration        | Add `.env` vars for batch size, max concurrency, API URLs              | ⬜ Not Started | Example: `BATCH_SIZE=50`                     |
| 19 | 🚀 Bonus Features       | Add retry logic with exponential backoff in worker                     | ⬜ Not Started | Retry jobs 3 times                           |
| 20 |                         | Add real-time updates with Socket.IO or SSE                            | ⬜ Not Started | Optional: Live update logs                   |
| 21 | 🧪 Testing              | Write minimal tests for `fetch`, `queue`, `worker` logic               | ⬜ Not Started | Jest or Postman/manual test                  |
| 22 | 📄 Documentation        | Write `/docs/architecture.md` with diagram                             | ⬜ Not Started | Use Draw\.io or Excalidraw                   |
| 23 |                         | Finalize `README.md` with setup and running steps                      | ⬜ Not Started | Includes assumptions and setup commands      |
| 24 | 🚢 Deployment           | Deploy backend to Render / Railway                                     | ⬜ Not Started | Link available                               |
| 25 |                         | Deploy frontend to Vercel                                              | ⬜ Not Started | Vercel link working                          |
| 26 |                         | Use MongoDB Atlas and Redis Cloud in prod                              | ⬜ Not Started | Production services connected                |
