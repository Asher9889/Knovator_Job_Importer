function normalizedData(data: any, source: string) {
    if (source.includes("jobicy")) {
      return {
        source: "jobicy",
        jobId: data.guid || data.link,
        title: data.title,
        description: data["content:encoded"] || data.description,
        company: data["dc:creator"] || "Unknown",
        location: "Remote",
        url: data.link,
        postedAt: new Date(data.pubDate),
      };
    }
  
    if (source.includes("higheredjobs")) {
      return {
        source: "higheredjobs",
        jobId: data.guid || data.link,
        title: data.title,
        description: data.description,
        company: "HigherEdJobs",
        location: "USA",
        url: data.link,
        postedAt: new Date(data.pubDate),
      };
    }
  
    return {}; // fallback for unknown sources
}


export default normalizedData;

  