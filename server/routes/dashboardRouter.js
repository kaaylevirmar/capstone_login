const express = require('express');
const router = express.Router();
const { viewDashboard } = require('../controller/dashboardController');


  


router.get('/', viewDashboard);

module.exports = router;