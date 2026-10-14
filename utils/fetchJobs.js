const axios = require("axios");
const JobOpportunity = require("../models/JobOpportunity");

module.exports.fetchJobs = async function () {
    console.log("Fetching jobs from SerpApi...");

    const response = await axios.get(
        "https://serpapi.com/search.json",
        {
            params: {
                engine: "google_jobs",
                q: "software developer intern OR web developer OR software engineer",
                location: "India",
                api_key: process.env.SERPAPI_KEY
            }
        }
    );

    const jobs = response.data.jobs_results || [];

    console.log("Jobs received:", jobs.length);

    let savedCount = 0;

    for (const job of jobs) {
        try {
            const title = job.title || job.job_title || "";

            const company = job.company_name || "";

            const description = job.description || "";

            const searchText = `${title} ${description}`.toLowerCase();

            const keywords = [
                "software developer",
                "software engineer",
                "web developer",
                "frontend developer",
                "front-end developer",
                "backend developer",
                "back-end developer",
                "full stack developer",
                "fullstack developer",
                "javascript developer",
                "react developer",
                "node.js developer",
                "java developer",
                "python developer",
                "developer intern",
                "software intern"
            ];

            const isRelevant = keywords.some(keyword =>
                searchText.includes(keyword)
            );

            if (!isRelevant) continue;

            const externalId = job.job_id;

            if (!externalId || !company || !title) continue;

            const extensions = job.extensions || [];

            const postedAt =
                extensions.find(item =>
                    /hour|day|week|month|today|yesterday/i.test(item)
                ) || "";

            const jobType =
                extensions.find(item =>
                    /full.time|part.time|contract|internship|temporary/i.test(item)
                ) || (/intern/i.test(title) ? "Internship" : "Not specified");

            const applyOptions = (job.apply_options || [])
                .filter(option => option.link)
                .map(option => ({
                    title: option.title || "Apply",
                    link: option.link
                }));

            const applicationUrl =
                applyOptions[0]?.link ||
                job.share_link ||
                job.source_link;

            if (!applicationUrl) continue;

            const jobData = {
                externalId,
                title,
                company,
                companyLogo: job.thumbnail || "",
                description,
                location: job.location || "Not specified",
                jobType,
                postedAt,
                applicationUrl,
                applyOptions,
                source: "SerpApi",
                lastFetchedAt: new Date()
            };

            await JobOpportunity.updateOne(
                { externalId },
                { $set: jobData },
                { upsert: true }
            );

            savedCount++;
        } catch (error) {
            console.error(
                `Could not save job "${job.title || "Unknown"}":`,
                error.message
            );
        }
    }

    console.log("Jobs saved or updated:", savedCount);

    return savedCount;
};
