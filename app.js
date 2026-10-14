if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}

const express = require("express");
const app = express();
const ejsmate = require("ejs-mate");
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override');
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const ExpressError = require("./utils/ExpressError.js");
const flash = require("connect-flash");
let User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const list_application=require("./routes/list_application.js");
const user=require("./routes/user.js");
const navbar_features=require("./routes/navbar_feature.js");
const dbUrl = process.env.Db_Url;
module.exports.dburl=dbUrl;

app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const store=MongoStore.create({
  mongoUrl:dbUrl,
   mongoOptions: {
        family: 4,
        serverSelectionTimeoutMS: 10000
    },
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,//it is saved information of session of the current duration also if you not  do any change it just give your current page.
});

store.on("error",()=>{
  console.log("Error in MONGO SESSION STORE",err);
});

const sessionOptions={
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false,
  store,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.err = req.flash("error");
    res.locals.CurrentUser = req.user;
    next();
});

main() 
 .then(()=>{
   console.log("connected to DB");
 }) 
 .catch((err)=>{
   console.log(err);
 });
async function main(){
  await mongoose.connect(dbUrl,{
    serverSelectionTimeoutMS: 10000,
    family: 4,
  });
}
//list page + Add page + Show page + Edit page + Update page + Delete page + Record page + Search page
app.use("/portel/list/",list_application);


//login page + Signup page + logout page
app.use("/",user);

//upcoming-event page + Job-Opportunity page + terms wala page + policy page + Contact page + Home page
app.use("/",navbar_features);

app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
    //   res.status(statusCode).send(message);
    //   res.send("something went wrong");
});
app.listen(8080, () => {
    console.log('Server is running on localhost 8080');
})