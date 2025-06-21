import { NextFunction, Request, Response } from "express";
import { ApiSuccessResponse, ApiErrorResponse } from "../utils";
import { StatusCodes } from "http-status-codes";
import { fetchAndQueueJobs as fetchAllJobAndAddToQueue  } from "../utils/helpers/fetchJobAndQueue";


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

export { fetchJobAndQueue }