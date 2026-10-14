const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { Login, saveRedirectUrl, isOwner,validateListing } = require("../middleware.js");
let User = require("../models/user.js");
const passport = require("passport");
const user_controllers=require("../controllers/user.js");

router
    .route("/signup")
    .get(wrapAsync(user_controllers.signup_get))
    .post(saveRedirectUrl, wrapAsync(user_controllers.signup_post));
router
    .route("/login")
    .get(user_controllers.login_get)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true, }), wrapAsync(user_controllers.login_post));
router
    .get("/logout", user_controllers.logOut);

module.exports=router;