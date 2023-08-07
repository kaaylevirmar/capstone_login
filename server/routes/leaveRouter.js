const express = require('express');
const router = express.Router();
const { viewLeaveManagement, leaveForm, fetchDataForm } = require('../controller/leaveController');


  


router.get('/leave-management', viewLeaveManagement);
router.get('/leave-management/new-leave-request', leaveForm);
router.get('/leave-management/:id', fetchDataForm);


module.exports = router;