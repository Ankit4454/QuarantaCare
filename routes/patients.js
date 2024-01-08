const express = require('express');
const router = express.Router();
const passport = require('passport');
const patientController = require('../controllers/patient_controller');

router.post('/register', passport.authenticate('jwt', { session: false, failureRedirect: '/users/signin' }), patientController.register);
router.post('/:id/create_report', passport.authenticate('jwt', { session: false, failureRedirect: '/users/signin' }), patientController.createReport);
router.get('/:id/all_reports', passport.authenticate('jwt', { session: false, failureRedirect: '/users/signin' }), patientController.viewPatientReports);
router.get('/delete/:id', passport.authenticate('jwt', { session: false, failureRedirect: '/users/signin' }), patientController.delete);

module.exports = router;