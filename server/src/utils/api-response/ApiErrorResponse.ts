class ApiErrorResponse extends Error {
    status: boolean;
    statusCode: number;
    message: string;
    data: any;
    name: string;

    constructor(statusCode: number, message: string, data: any = null) {
        super(message);
        this.status = false;
        this.statusCode = statusCode;
        this.name = "ApiErrorResponse";
        this.message = message;
        this.data = data;

        // ✅ Capture stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiErrorResponse);
        }

    }


}

export default ApiErrorResponse;