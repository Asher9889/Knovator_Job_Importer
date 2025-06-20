import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { parseStringPromise } from "xml2js";
import { ApiErrorResponse } from "../utils";
import { IJobFeedAPIs } from "../utils/constants/jobUrl";

async function fetchJob(feed: IJobFeedAPIs): Promise<any> {
  try {
    const response = feed.fullURL
      ? await axios.get<string>(feed.fullURL)
      : await axios.get<string>(feed.baseURL!, { params: feed.params });

      

    const jsObj = await parseStringPromise(response.data, {
      explicitArray: false,
      mergeAttrs: true,
      strict: false,              // ← makes parser lenient (important)
      xmlns: false,               // ← ignore XML namespaces
      tagNameProcessors: [name => name.trim()],
    });

    // const jsonData = JSON.stringify(jsObj)


    return jsObj;
  } catch (error: any) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = error.message;
    throw new ApiErrorResponse(statusCode, msg);
  }

}



export { fetchJob }