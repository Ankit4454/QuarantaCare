const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

let opts = {}
opts.secretOrKey = 'secretJWT';

let cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

opts.jwtFromRequest = cookieExtractor;
opts.passReqToCallback = true;

passport.use(new JwtStrategy(opts, function (req, jwt_payload, done) {
    User.findById(new ObjectId(jwt_payload.user._id)).then(function (user) {
        if (!user) {
            req.flash('error', 'Unauthorized');
            return done(null, false);
        }
        return done(null, user);
    }).catch(function (err) {
        req.flash('error', err);
        return done(err, false);
    });
}));

passport.isAuthenticated = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next();
        }

        return res.redirect('/');
    })(req, res, next);
}

passport.setAuthenticatedUser = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (user) {
            res.locals.user = user;
        }
        next();
    })(req, res, next);
}

module.exports = passport;