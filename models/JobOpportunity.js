const mongoose = require("mongoose");

const jobOpportunitySchema = new mongoose.Schema(
    {
        externalId: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        companyLogo: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: "Not specified"
        },

        jobType: {
            type: String,
            default: "Not specified"
        },

        postedAt: {
            type: String,
            default: ""
        },

        applicationUrl: {
            type: String,
            required: true
        },

        applyOptions: [
            {
                title: String,
                link: String
            }
        ],

        source: {
            type: String,
            default: "SerpApi"
        },

        lastFetchedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

jobOpportunitySchema.index(
    { externalId: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "JobOpportunity",
    jobOpportunitySchema
);
