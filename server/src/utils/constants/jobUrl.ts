interface IParams {
    feed: string,
}

interface IJobFeedAPIs {
    baseURL?: string;
    params?: Record<string, string>;
    fullURL?: string;

}

export const jobFeedAPIs:IJobFeedAPIs[] = [
    {
        baseURL: "https://jobicy.com/",
        params: { feed: "job_feed" }
    },
    {
        baseURL: "https://jobicy.com/",
        params: { feed: "job_feed", job_categories: "smm", job_types: "full-time" }
    },
    {
        baseURL: "https://jobicy.com/",
        params: {
            feed: "job_feed",
            job_categories: "seller",
            job_types: "full-time",
            search_region: "france"
        }
    },
    {
        baseURL: "https://jobicy.com/",
        params: { feed: "job_feed", job_categories: "design-multimedia" }
    },
    {
        baseURL: "https://jobicy.com/",
        params: { feed: "job_feed", job_categories: "data-science" }
    },
    {
        baseURL: "https://jobicy.com/",
        params: { feed: "job_feed", job_categories: "copywriting" }
    },
    {
        baseURL: "https://jobicy.com/",
        params: { feed: "job_feed", job_categories: "business" }
    },
    {
        baseURL: "https://jobicy.com/",
        params: { feed: "job_feed", job_categories: "management" }
    },
    // HigherEdJobs doesn't support params, so treat it as-is
    {
        fullURL: "https://www.higheredjobs.com/rss/articleFeed.cfm"
    }
];
