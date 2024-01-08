const express = require('express');
const router = express.Router();
const passport = require('passport');
const doctorController = require('../controllers/doctor_controller');

router.post('/register', doctorController.createUser);
router.post('/login', doctorController.login);
router.get('/logout', doctorController.logout);
router.get('/profile', passport.authenticate('jwt', { session: false, failureRedirect: '/users/signin' }), doctorController.profile);

module.exports = router;