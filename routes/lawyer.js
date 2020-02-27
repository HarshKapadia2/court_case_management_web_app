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
        res.render('lawyer_dashboard', {f_name: req.user.fname});
    }
);


module.exports = router;