import express from "express";
import { jobController } from "../../controllers";
const router = express.Router();


router.post("/upsert-job", jobController.fetchJobAndQueue as any);
router.get("/import-jobs", jobController.getImportLogs as any);


export default router;