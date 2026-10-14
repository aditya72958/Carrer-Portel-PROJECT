const Application = require('../models/Application');
//Search page
module.exports.Search_page=async(req,res)=>{
    let Company=req.body.company;
    let filter;
    if (req.isAuthenticated()) {
        filter = { owner: req.user._id };
    } else {
        filter = { owner: { $exists: false } };
    }
    filter.company=Company;
    const search_application= await Application.find(filter).sort({ deadline: 1 });
    res.render("listing/search.ejs",{search_application});
}
//Record page
module.exports.Record_page=async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const application_data = await Application.find({
        owner: req.user._id,
        deadline: { $lt: today }
    }).sort({ deadline: -1 });

    res.render("listing/Record.ejs", { application_data });
}
//list page
module.exports.list_page=async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let filter;
    if (req.isAuthenticated()) {
        filter = { owner: req.user._id };
    } else {
        filter = { owner: { $exists: false } };
    }
    filter.deadline = { $gte: today };
    const application_data = await Application.find(filter).sort({ deadline: 1 });
    res.render("listing/ListPage.ejs", { application_data });
}
//Add page
module.exports.Add_page_get=async (req, res) => {
    res.render("listing/Add.ejs");
}
module.exports.Add_page_post=async (req, res) => {
    let { company, role, status, appliedDate, deadline, location, link, resume, notes } = req.body;
    const today = new Date().toISOString().split("T")[0];
    if (appliedDate > today) {
        req.flash("error", "Applied date cannot be in the future.");
        return res.redirect("/portel/list/add");
    }
    if (deadline < today) {
        req.flash("error", "Deadline cannot be in the past.");
        return res.redirect("/portel/list/add");
    }
    if (deadline <= appliedDate) {
        req.flash("error", "Deadline must be after applied date.");
        return res.redirect("/portel/list/add");
    }
    let newData = new Application(req.body);
    newData.owner = req.user._id;
    await newData.save()
    console.log("application saved");
    req.flash("success", "New Application Created!");
    res.redirect("/portel/list");
}
//show page
module.exports.Show_page=async (req, res) => {
    let { id } = req.params;
    let application_detail = await Application.findById(id);
    res.render("listing/showPage.ejs", { application_detail });
}
//update page
module.exports.Update_page=async (req, res) => {
    let { id } = req.params;
    let {
        company: newcompany,
        role: newrole,
        status: newstatus,
        appliedDate: newappliedDate,
        deadline: newdeadline,
        location: newlocation,
        link: newlink,
        resume: newresume,
        notes: newnotes,
    } = req.body;
    const today = new Date().toISOString().split("T")[0];
    if (newappliedDate > today) {
        req.flash("error", "Applied date cannot be in the future.");
        return res.redirect(`/portel/list/${id}/edit`);
    }
    if (newdeadline < today) {
        req.flash("error", "Deadline cannot be in the past.");
        return res.redirect(`/portel/list/${id}/edit`);
    }
    if (newdeadline <= newappliedDate) {
        req.flash("error", "Deadline must be after applied date.");
        return res.redirect(`/portel/list/${id}/edit`);
    }
    // console.log(newcompany);
    let Update_application = await Application.findByIdAndUpdate(id, {
        company: newcompany,
        role: newrole,
        status: newstatus,
        appliedDate: newappliedDate,
        deadline: newdeadline,
        location: newlocation,
        link: newlink,
        resume: newresume,
        notes: newnotes,
    });
    await Update_application.save();
    req.flash("success", "Application Succesfully Updated!");
    res.redirect(`/portel/list/${id}`)
}
//Delete page
module.exports.Delete_page=async (req, res) => {
    let { id } = req.params;
    let Delete_application = await Application.findByIdAndDelete(id);
    console.log(Delete_application);
    req.flash("success", "Application Successfully Deleted!");
    res.redirect(`/portel/list`);
}
//Edit page
module.exports.Edit_page=async (req, res) => {
    let { id } = req.params;
    let application_detail = await Application.findById(id);
    res.render("listing/Edit.ejs", { application_detail });
}