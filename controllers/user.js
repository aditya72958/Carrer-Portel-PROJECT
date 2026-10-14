let User = require("../models/user.js");
module.exports.signup_get=async (req, res) => {
    res.render("users/signup.ejs");
}
module.exports.signup_post=async (req, res,next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);//ye register karne wala chij hai ye data ka User.register(Schema,password) ye hai.
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Carrer Portel");
            let redirectUrl = res.locals.redirectUrl || "/";
            // delete req.session.redirectUrl;
            res.redirect(redirectUrl);
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}
module.exports.login_get=async (req, res) => {
    res.render("users/login.ejs");
}
module.exports.login_post=async (req, res) => {
    req.flash("success", "Welcome to Carrer Portel");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
}
module.exports.logOut= (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Successfully Logout!");
        res.redirect("/");
    })
}