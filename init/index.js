const mongoose = require('mongoose');
require("dotenv").config({ path: "../.env" });
const Application = require("../models/Application.js");
const demo_data = require("./application-data.js");
const Dburl=process.env.Db_Url;
main() 
 .then(()=>{
   console.log("connected to DB");
 }) 
 .catch((err)=>{
   console.log(err);
 });
async function main(){
  await mongoose.connect(Dburl,{
    serverSelectionTimeoutMS: 10000,
    family: 4,
  });
}
const initdb = async () => {
    await Application.deleteMany({});
    await Application.insertMany(demo_data.Application_data_all);
    console.log("data is initialised");
}

initdb();
