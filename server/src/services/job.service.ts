import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { parseStringPromise } from "xml2js";
import { ApiErrorResponse } from "../utils";
import { IJobFeedAPIs } from "../utils/constants/jobUrl";

async function fetchJob(feed: IJobFeedAPIs):Promise<any> {
  try {
    const response = feed.fullURL
      ? await axios.get<string>(feed.fullURL)
      : await axios.get<string>(feed.baseURL!, { params: feed.params });

    const jsonData = await parseStringPromise(response.data, {
      explicitArray: false,
      mergeAttrs: true,
    });

    console.log("✅ Parsed JSON:", JSON.stringify(jsonData));

    return jsonData;
  } catch (error: any) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = error.message;
    throw new ApiErrorResponse(statusCode, msg);
  }

}



export { fetchJob }