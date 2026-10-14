const Application = require("./models/Application");
const ExpressError = require("./utils/ExpressError.js");
const { applicationSchema } = require("./schema.js");
let isFetchingJobs = false;
let lastJobsFetchTime = 0;
const JobOpportunity = require("./models/JobOpportunity");
const { fetchJobs } = require("./utils/fetchJobs");

module.exports.Login = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create an application. Please log in first!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const application = await Application.findById(id);
        if (!application) {
            req.flash("error", "Application not found!");
            return res.redirect("/portel/list");
        }
        if (!application.owner || !application.owner.equals(req.user._id)) {
            req.flash("error", "You do not have permission to access this application!");
            return res.redirect("/portel/list");
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports.validateListing = (req, res, next) => {
    let { error } = applicationSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.refreshJobsIfNeeded = async ()=> {
    const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

    if (isFetchingJobs) return;

    const jobsExist = await JobOpportunity.exists({});

    const refreshDue =
        !lastJobsFetchTime ||
        Date.now() - lastJobsFetchTime >= REFRESH_INTERVAL;

    if (!jobsExist || refreshDue) {
        isFetchingJobs = true;

        try {
            await fetchJobs();
            lastJobsFetchTime = Date.now();
        } catch (error) {
            console.error("Job refresh failed:", error.message);
        } finally {
            isFetchingJobs = false;
        }
    }
};
