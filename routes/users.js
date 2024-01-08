const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

router.get('/signup', passport.isAuthenticated, homeController.signup);
router.get('/signin', passport.isAuthenticated, homeController.signin);

module.exports = router;