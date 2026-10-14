const Application = require("../models/Application");

const application_data = [
    {
      company: "Google",
      role: "Software Engineering Intern",
      status: "🔵Applied",
      appliedDate: "2026-08-25",
      deadline: "2026-11-21",
      location: "Bengaluru / Remote",
      link: "https://example.com/google",
      resume: "Resume_v1.pdf",
      notes: "DSA + C++ resume"
    },
    {
      company: "Microsoft",
      role: "Data Analyst",
      status: "🟣OA/Test",
      appliedDate: "2026-08-20",
      deadline: "2026-11-22",
      location: "Hyderabad",
      link: "https://example.com/microsoft",
      resume: "Resume_v2.pdf",
      notes: "Waiting for OA"
    },
    {
      company: "Amazon",
      role: "AI Intern",
      status: "🟢Accepted",
      appliedDate: "2026-08-18",
      deadline: "2026-11-23",
      location: "Bengaluru",
      link: "https://example.com/amazon",
      resume: "Resume_v2.pdf",
      notes: "OA preparation needed"
    },
    {
      company: "Flipkart",
      role: "SDE Intern",
      status: "🟣OA/Test",
      appliedDate: "2026-08-22",
      deadline: "2026-11-25",
      location: "Bengaluru",
      link: "https://example.com/flipkart",
      resume: "Resume_v2.pdf",
      notes: "Referral used"
    },
    {
      company: "Walmart",
      role: "Software Developer Intern",
      status: "🟡Interview",
      appliedDate: "2026-08-10",
      deadline: "2026-12-01",
      location: "Bengaluru",
      link: "https://example.com/walmart",
      resume: "Resume_v1.pdf",
      notes: "Technical interview scheduled"
    },
    {
      company: "Walmart",
      role: "Software Developer Intern",
      status: "🟠Saved",
      appliedDate: "2026-08-10",
      deadline: "2026-12-01",
      location: "Bengaluru",
      link: "https://example.com/walmart",
      resume: "Resume_v1.pdf",
      notes: "Technical interview scheduled"
    } ,
    {
      company: "Walmart",
      role: "Software Developer Intern",
      status: "🔵Applied",
      appliedDate: "2026-08-10",
      deadline: "2026-08-15",
      location: "Bengaluru",
      link: "https://example.com/walmart",
      resume: "Resume_v1.pdf",
      notes: "Technical interview scheduled",
      owner:"6ac94435221c90e39a981e4a"
    },
    {
      company: "Walmart",
      role: "Software Developer Intern",
      status: "🟠Saved",
      appliedDate: "2026-08-10",
      deadline: "2026-08-16",
      location: "Bengaluru",
      link: "https://example.com/walmart",
      resume: "Resume_v1.pdf",
      notes: "Technical interview scheduled",
      owner:"6ac94435221c90e39a981e4a"
    } 
  ];
  module.exports={Application_data_all:application_data};