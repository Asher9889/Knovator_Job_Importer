import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { parseStringPromise } from "xml2js";
import { ApiErrorResponse } from "../utils";


async function fetchJob(apiUrl: string) {
  try {
    const response = await axios.get(apiUrl);
    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData, { // parsing xml data to json in async fashion
      explicitArray: false,
      mergeAttrs: true
    });

    return jsonData;
  } catch (error: any) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = error.message;
    throw new ApiErrorResponse(statusCode, msg);
  }

}



export { fetchJob }