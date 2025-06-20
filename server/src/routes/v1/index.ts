import express from "express";
// import v1Routes from "./v1";
const router = express.Router();

router.use("/v1", ()=>{console.log("v1 routes")});

export default router;