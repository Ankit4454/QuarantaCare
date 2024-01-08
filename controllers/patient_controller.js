const User = require('../models/user');
const Report = require('../models/report');

module.exports.register = function (req, res) {
    User.findOne({ phoneNumber: req.body.phoneNumber }).then(function (data) {
        if (!data) {
            User.create({ email: req.body.email, userName: req.body.userName, phoneNumber: req.body.phoneNumber, userType: 'Patient', createdByDoctor: req.user.id }).then(function (user) {
                req.flash('success', 'Patient registered successfully');
                return res.redirect('back');
            }).catch(function (err) {
                req.flash('error', err);
                console.log(`Error while creating a user ${err}`);
            });
        } else {
            req.flash('error', 'Patient is already registered');
            return res.redirect('back');
        }
    }).catch(function (err) {
        req.flash('error', err);
        console.log(`Error while fetching a user ${err}`);
    });
}

module.exports.viewPatientReports = function (req, res) {
    User.findById(req.params.id).then(function (patient) {
        Report.find({ patient: req.params.id }).sort('-createdAt').populate('doctor patient').then(function (reports) {
            return res.render('patientReport', {
                patient: patient,
                reports: reports
            });
        }).catch(function (err) {
            req.flash('error', err);
            console.log(`Error while fetching patient's reports ${err}`);
        });
    }).catch(function (err) {
        req.flash('error', err);
        console.log(`Error while fetching a patient ${err}`);
    });
}

module.exports.createReport = function (req, res) {
    Report.create({ doctor: req.user.id, patient: req.params.id, status: req.body.status }).then(function(data){
        return res.redirect('back');
    }).catch(function(err){
        req.flash('error', err);
        console.log(`Error while creating a report ${err}`);
    });
}

module.exports.delete = function (req, res) {
    User.findByIdAndDelete(req.params.id).then(function (data) {
        return res.redirect('back');
    }).catch(function (err) {
        req.flash('error', err);
        console.log(`Error while deleting a patient ${err}`);
    });
}