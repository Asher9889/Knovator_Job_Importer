import express from "express";
import { jobController } from "../../controllers";
import jobRoutes from "./job.routes"
// import v1Routes from "./v1";

const router = express.Router();

router.use("/job", jobRoutes);

export default router;