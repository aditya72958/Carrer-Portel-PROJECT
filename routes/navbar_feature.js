const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Application = require('../models/Application');
const {refreshJobsIfNeeded} = require("../middleware.js");
const JobOpportunity = require("../models/JobOpportunity");
const navbar_feature_controllers=require("../controllers/navbar_feature.js")

router
    //upcoming event page
    .get("/upcoming-event",wrapAsync(navbar_feature_controllers.upcoming_event_page))
    //job opportunity page
    .get("/Job-Opportunity",wrapAsync(navbar_feature_controllers.job_opportunities_page))
    //terms page
    .get("/terms",wrapAsync(navbar_feature_controllers.terms_page))
    //policy page
    .get("/policy",wrapAsync(navbar_feature_controllers.policy_page))
    //contact page
    .get("/Contact",wrapAsync(navbar_feature_controllers.contact_page))
    //home page
    .get('/', wrapAsync(navbar_feature_controllers.home_page));
module.exports=router;