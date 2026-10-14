const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { Login, isOwner,validateListing } = require("../middleware.js");
const list_application_controllers=require("../controllers/list_application.js");

router
    //Search page
    .post("/search", wrapAsync(list_application_controllers.Search_page))
    //Record page
    .get("/record", Login, wrapAsync(list_application_controllers.Record_page))
    //Add page
    .get("/add",Login, wrapAsync(list_application_controllers.Add_page_get));

router
    .route("/")
    //list page
    .get(wrapAsync(list_application_controllers.list_page))
    ///Add page
    .post(Login, validateListing, wrapAsync(list_application_controllers.Add_page_post));

router
    .route("/:id")
    //Show page
    .get( Login, isOwner, wrapAsync(list_application_controllers.Show_page))
    //Update page
    .put( Login, isOwner, validateListing, wrapAsync(list_application_controllers.Update_page))
    //Delete Page
    .delete( Login, isOwner, wrapAsync(list_application_controllers.Delete_page));

router
    //Edit page
    .get("/:id/edit", Login, isOwner, wrapAsync(list_application_controllers.Edit_page));
    
module.exports=router;