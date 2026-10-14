const Application = require('../models/Application');
const JobOpportunity = require("../models/JobOpportunity");
const {refreshJobsIfNeeded} = require("../middleware.js");


//Upcoming_event page
module.exports.upcoming_event_page=async(req,res)=>{
    res.render("About/Upcoming_event.ejs");
}
//job opportunity page
module.exports.job_opportunities_page=async(req,res)=>{
    res.render("About/job_opportunities.ejs");
}
//terms page
module.exports.terms_page=async(req,res)=>{
    res.render("terms&&policy/terms.ejs");
}
//policy page
module.exports.policy_page=async(req,res)=>{
    res.render("terms&&policy/policy.ejs");
}
//contact page
module.exports.contact_page=async(req,res)=>{
    res.render("About/contact_info.ejs");
}
//home page
module.exports.home_page=async (req, res) => {
    // Step 1: Refresh jobs when needed
    await refreshJobsIfNeeded();
    const job_opportunities = await JobOpportunity.find({}).sort({ updatedAt: -1 }).limit(20);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let filter;
    if (req.isAuthenticated()) {
        filter = { owner: req.user._id };
    } else {
        filter = { owner: { $exists: false } };
    }
    filter.deadline = { $gte: today };
    const count_application = await Application.countDocuments(filter);
    const Applied_application = await Application.countDocuments({ ...filter, status: "🔵Applied" });
    const OA_Test_application = await Application.countDocuments({ ...filter, status: "🟣OA/Test" });
    const Interview_application = await Application.countDocuments({ ...filter, status: "🟡Interview" });
    const Saved_application = await Application.countDocuments({ ...filter, status: "🟠Saved" });
    const recentApplications = await Application.find(filter).sort({ deadline: 1 }).limit(3);
    res.render("Home/main_page.ejs", {
        count_application,
        Applied_application,
        OA_Test_application,
        Interview_application,
        Saved_application,
        job_opportunities,
        recentApplications,
    })
};