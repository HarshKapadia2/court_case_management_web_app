const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

//dashboard
router.get
(
    '/dashboard',
    ensureAuthenticated,
    (req, res) =>
    {
        res.render('client_dashboard');
    }
);


module.exports = router;