class ApiErrorResponse extends Error {
    status: boolean;
    message: string;
    data: any;
    name: string;

    constructor(statusCode: number, message: string, data: any = null) {
        super(message);
        this.status = false;
        this.name = "ApiErrorResponse";
        this.message = message;
        this.data = data;

        // ✅ Capture stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiErrorResponse);
        }

    }


}