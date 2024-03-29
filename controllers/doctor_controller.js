const { compareSync } = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.createUser = function (req, res) {
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailValidator.test(req.body.email)) {
        req.flash('error', 'Invalid email format');
        return res.redirect('back');
    }

    if (!passwordValidator.test(req.body.password)) {
        req.flash('error', 'Invalid password format. Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }).then(function (data) {
        if (!data) {
            User.create({ email: req.body.email, userName: req.body.userName, password: req.body.password, userType: 'Doctor' }).then(function (user) {
                req.flash('success', 'Registration successful');
                return res.redirect('/users/signin');
            }).catch(function (err) {
                req.flash('error', err);
                console.log(`Error while creating a user ${err}`);
            });
        } else {
            req.flash('error', 'This email is already in use');
            return res.redirect('back');
        }
    }).catch(function (err) {
        req.flash('error', err);
        console.log(`Error while fetching a user ${err}`);
    });
}

module.exports.login = function (req, res) {
    User.findOne({ email: req.body.email }).then(function (user) {
        if (!user) {
            req.flash('error', 'Invalid credentials');
            return res.redirect('back');
        }
        const isPasswordValid = compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            req.flash('error', 'Invalid credentials');
            return res.redirect('back');
        }

        const token = jwt.sign({ user }, process.env.SECRET_JWT_QC, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true });
        req.flash('success', 'You have successfully logged in');
        return res.redirect('/');
    }).catch(function (err) {
        req.flash('error', err);
        console.log(`Error while fetching a user ${err}`);
    });
}

module.exports.logout = function (req, res) {
    delete req.user;
    res.locals.user = undefined;
    req.flash('success', 'You have successfully logged out');
    res.clearCookie('jwt');
    return res.redirect('/');
}

module.exports.profile = function (req, res) {
    return res.render('profile', {
        user: req.user
    });
}

module.exports.update = function (req, res) {
    if (req.user.id == req.body.id) {
        User.findByIdAndUpdate(req.body.id, { userName: req.body.userName, email: req.body.email }).then(function (user) {
            req.flash('success', 'Profile updated successfully');
            return res.redirect('back');
        }).catch(function (err) {
            req.flash('error', err);
            console.log(`Error while updating a user ${err}`);
        });
    }
}