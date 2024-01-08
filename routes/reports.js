const express = require('express');
const router = express.Router();
const passport = require('passport');
const reportController = require('../controllers/report_controller');

router.get('/:status?', passport.authenticate('jwt', { session: false, failureRedirect: '/users/signin' }), reportController.reportStatus);
router.get('/view/:id', passport.authenticate('jwt', { session: false, failureRedirect: '/users/signin' }), reportController.viewReport);
router.get('/delete/:id', passport.authenticate('jwt', { session: false, failureRedirect: '/users/signin' }), reportController.delete);

module.exports = router;