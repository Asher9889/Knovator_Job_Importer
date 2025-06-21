import { NextFunction, Request, Response } from "express";
import { ApiSuccessResponse, ApiErrorResponse } from "../utils";
import { StatusCodes } from "http-status-codes";
import { fetchAndQueueJobs as fetchAllJobAndAddToQueue } from "../utils/helpers/fetchJobAndQueue";
import { ImportLog } from "../models";

//----- Fetch Job And Add to Queue(BullMQ) ---->
async function fetchJobAndQueue(req: Request, res: Response, next: NextFunction) {
    try {
        const { importId, total } = await fetchAllJobAndAddToQueue();

        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, "Jobs fetched & queued", { importId, total }));

    } catch (error: any) {
        if (error instanceof ApiErrorResponse) {
            return next(error);
        } else {
            const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            const msg = error.message
            return next(new ApiErrorResponse(statusCode, msg))
        }
    }

}

//----- Fetch Last 20 import-logs ---->
async function getImportLogs(req: Request, res: Response, next: NextFunction) {

    try {

        const p = parseInt(req.query.page as string) || 1;
        const l = parseInt(req.query.limit as string) || 20;

        if (isNaN(p) || isNaN(l)) {
            throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, "Provide valid numeric query parameters.");
        }
        if (!p || !l) {
            throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, "Provide valid query");
        }

        const logs = await ImportLog.find({})
            .sort({ timestamp: -1 })
            .skip((p - 1) * l)
            .limit(l);

        const total = logs.length;

        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, "Data fetched successfully", {
            total,
            page: p,
            limit: l,
            logs,
        }));
    } catch (err:any) {
        if(err instanceof ApiErrorResponse){
            return next(err);
        }else{
            const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            const msg = err.message;
            return next(new ApiErrorResponse(statusCode, msg));
        }
    }

}
export { fetchJobAndQueue, getImportLogs }