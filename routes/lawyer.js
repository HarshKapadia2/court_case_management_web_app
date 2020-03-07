const express = require('express');
const router = express.Router();

//include auth fn
const {ensureAuthenticated} = require('../config/auth');

const CaseDetails = require('../models/CaseDetails');

//dashboard
router.get
(
    '/dashboard',
    ensureAuthenticated,
    async (req, res) =>
    {
        const cases = await CaseDetails.find
        (
            {
                lawyer_id: req.user.id
            }
        ).then
        (
            (cases) =>
            {
                res.render('lawyer_dashboard', {f_name: req.user.fname, cases});
            }
        ).catch
        (
            (err) => console.log(err)
        );        
    }

);


module.exports = router;