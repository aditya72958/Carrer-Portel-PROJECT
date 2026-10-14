const mongoose=require("mongoose");
const applicationData = require("../init/application-data");
const { date } = require("joi");
const Schema=mongoose.Schema;

const application_all_data=new Schema({
    company:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    appliedDate:{
        type:Date,
        required:true,
    },
    deadline:{
        type:Date,
        required:true,
    },
    location:String,
    link:String,
    resume:String,
    notes:String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
})

module.exports=mongoose.model("application_all_data",application_all_data);