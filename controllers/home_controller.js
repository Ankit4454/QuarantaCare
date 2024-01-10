const User = require('../models/user');
const Report = require('../models/report');
const ContactUsMailer = require('../mailers/contactUs_mailer');
const ResetPasswordMailer = require('../mailers/resetPassword_mailer');
const jwt = require('jsonwebtoken');

module.exports.home = function (req, res) {
    User.find({ userType: 'Patient' }).sort('-createdAt').populate('createdByDoctor').then(function (patients) {
        Report.find({}).sort('-createdAt').populate('doctor patient').then(function (reports) {
            res.render("home", {
                patients: patients,
                reports: reports
            });
        }).catch(function (err) {
            req.flash('error', err);
            console.log(`Error while fetching reports ${err}`);
        })
    }).catch(function (err) {
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

module.exports.forgotPassword = function (req, res) {
    res.render("forgotPassword");
}

module.exports.sendResetPasswordLink = function (req, res) {
    User.findOne({email: req.body.email}).then(function(user){
        if(!user){
            req.flash('error', 'User does not exist');
            return res.redirect('back');
        }
        const token = jwt.sign({ user }, process.env.SECRET_JWT_QC, { expiresIn: '600s' });
        const link = `${req.protocol}://${req.get('host')}/users/resetPassword/${token}`;

        ResetPasswordMailer.newResetPassword({
            user: user,
            link: link
        });

        req.flash('success', 'We have sent a reset password link to your email. Please check.');
        return res.redirect('back');
    }).catch(function(err){
        req.flash('error', err);
        console.log(`Error while fetching a user ${err}`);
    })
}

module.exports.resetPassword = function (req, res) {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_JWT_QC);
    let dateNow = new Date();

    if (decoded.exp < dateNow.getTime() / 1000) {
        req.flash('error', 'Reset password link expired');
        return res.render('signin');
    }

    res.render("resetPassword", {
        token: token
    });
}

module.exports.updatePassword = function (req, res) {
    const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.SECRET_JWT_QC);
    let dateNow = new Date();

    if (decoded.exp < dateNow.getTime() / 1000) {
        req.flash('error', 'Reset password link expired');
        return res.render('signin');
    }

    if (!passwordValidator.test(req.body.password)) {
        req.flash('error', 'Invalid password format. Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.');
        return res.redirect('back');
    }

    if (req.body.password != req.body.confirmPassword){
        req.flash('error', 'Password and Confirm Password does not match');
        return res.redirect('back');
    }

    User.findByIdAndUpdate(decoded.user._id, {password: req.body.password}).then(function(data){
        req.flash('success', 'Password Changed');
        return res.redirect('/users/signin');
    }).catch(function(err){
        req.flash('error', err);
        console.log(`Error while updating a password ${err}`);
    });
}

module.exports.contactUs = function (req, res) {
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValidator.test(req.body.email)) {
        req.flash('error', 'Invalid email format');
        return res.redirect('back');
    }
    ContactUsMailer.newContactUs(req.body);

    req.flash('success', 'Your message has been sent successfully');
    return res.redirect('back');
}
