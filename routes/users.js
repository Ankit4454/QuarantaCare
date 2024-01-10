const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

router.get('/signup', passport.isAuthenticated, homeController.signup);
router.get('/signin', passport.isAuthenticated, homeController.signin);
router.get('/forgotPassword', passport.isAuthenticated, homeController.forgotPassword);
router.get('/resetPassword/:token', passport.isAuthenticated, homeController.resetPassword);
router.post('/sendResetPasswordLink', passport.isAuthenticated, homeController.sendResetPasswordLink);
router.post('/updatePassword', passport.isAuthenticated, homeController.updatePassword);

module.exports = router;