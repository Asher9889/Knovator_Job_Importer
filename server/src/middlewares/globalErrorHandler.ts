import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiErrorResponse } from "../utils";

function globalErrorHandler(err:any, req:Request, res:Response, next:NextFunction):Response{
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json(new ApiErrorResponse(statusCode, message));
}

export default globalErrorHandler;