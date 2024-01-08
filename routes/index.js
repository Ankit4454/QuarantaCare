const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/aboutus', homeController.aboutUs);
router.get('/services', homeController.services);
router.get('/contact', homeController.contactUs);
router.use('/doctors', require('./doctors'));
router.use('/patients', require('./patients'));
router.use('/reports', require('./reports'));
router.use('/users', require('./users'));

module.exports = router;