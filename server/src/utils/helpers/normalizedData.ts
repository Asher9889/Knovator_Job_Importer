function normalizedData(data: any, source: string) {
    if (source.includes("jobicy")) {
      return {
        source: "jobicy",
        jobId: data.ID,
        title: data.TITLE,
        description: data.DESCRIPTION,
        company: data['JOB_LISTING:COMPANY'] || "Unknown",
        location: data['JOB_LISTING:LOCATION'] || "Unknown",
        url: data["MEDIA:CONTENT"]["URL"],
        postedAt: new Date(data.PUBDATE),
      };
    }
  
    if (source.includes("higheredjobs")) {
      return {
        source: "higheredjobs",
        jobId: data.ID,
        title: data.TITLE,
        description: data.DESCRIPTION,
        company: data['JOB_LISTING:COMPANY'] || "Unknown",
        location: data['JOB_LISTING:LOCATION'] || "Unknown",
        url: data["MEDIA:CONTENT"]["URL"],
        postedAt: new Date(data.PUBDATE),
      };
    }
  
    return {}; // fallback for unknown sources
}


export default normalizedData;

  