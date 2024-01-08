const User = require('../models/user');
const Report = require('../models/report');

module.exports.home = function (req, res) {
    User.find({userType: 'Patient'}).sort('-createdAt').populate('createdByDoctor').then(function(patients){
        Report.find({}).sort('-createdAt').populate('doctor patient').then(function(reports){
            res.render("home", {
                patients: patients,
                reports: reports
            });
        }).catch(function(err){
            req.flash('error', err);
            console.log(`Error while fetching reports ${err}`);
        })
    }).catch(function(err){
        req.flash('error', err);
        console.log(`Error while fetching patients ${err}`);
    });
}

module.exports.signup = function (req, res) {
    res.render("signup");
}

module.exports.signin = function (req, res) {
    res.render("signin");
}

module.exports.aboutUs = function (req, res) {
    res.render("about");
}

module.exports.services = function (req, res) {
    res.render("services");
}

module.exports.contact = function (req, res) {
    res.render("contact");
}

module.exports.contactUs = function (req, res) {
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValidator.test(req.body.email)) {
        req.flash('error', 'Invalid email format');
        return res.redirect('back');
    }
}
