class ApiSuccessResponse {
    status: boolean;
    statusCode: number;
    message: string;
    data: any;
    

    constructor(statusCode: number, message: string, data: any = null) {
       
        this.status = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }


}

export default ApiSuccessResponse;