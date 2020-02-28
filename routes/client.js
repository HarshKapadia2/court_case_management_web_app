const express = require('express');
const router = express.Router();

//include auth fn
const {ensureAuthenticated} = require('../config/auth');

const CaseDetails = require('../models/CaseDetails');
const User = require('../models/User');

//dashboard
router.get
(
    '/dashboard',
    ensureAuthenticated,
    async (req, res) =>
    {
        //const lawyers = CaseDetails.find
        const cases = await CaseDetails.find
        (
            {
                client_id: req.user.id
            }
        ).then
        (
            (cases) =>
            {
                res.render('client_dashboard', {f_name: req.user.fname, cases});
            }
        ).catch
        (
            (err) => console.log(err)
        );        
    }

);

//add case pg 1
router.get
(
    '/add_case_pg1',
    ensureAuthenticated,
    (req, res) =>
    {
        res.render('add_case_pg1');
    }
);
router.post
(
    '/add_case_pg1',
    ensureAuthenticated,
    (req, res) =>
    {
        const new_case_details = new CaseDetails
        (
            {
                client_id: req.user._id,
                case_name: req.body.case_name,
                case_type: req.body.case_type,
                case_descp: req.body.case_descp
            }
        );

        new_case_details.save().then
        (
            (new_case_obj) =>
            {
                res.redirect('/client/add_case_pg2');
            }
        ).catch
        (
            (err) => console.log(err)
        );
    }
);

//add case pg 2
router.get
(
    '/add_case_pg2',
    ensureAuthenticated,
    async (req, res) =>
    {
        //const lawyers = CaseDetails.find
        const users = await User.find
        (
            {
                personType: 'l'
            }
        ).then
        (
            (lawyers) =>
            {
                res.render('add_case_pg2', {lawyers});
            }
        ).catch
        (
            (err) => console.log(err)
        );        
    }
);
router.post
(
    '/add_case_pg2',
    ensureAuthenticated,
    (req, res) =>
    {
        CaseDetails.updateOne
        (
            {
                client_id: req.user.id //you'll need to get the case id as well
            },
            {
                $set: {
                    lawyer_id: "5e566b5f2d661d1da065f98c"
                }
            }
        ).then
        (
            res.redirect('/client/add_case_pg3')
        ).catch
        (
            (err) => console.log(err)
        );
    }
);

//add case pg 3
router.get
(
    '/add_case_pg3',
    ensureAuthenticated,
    (req, res) =>
    {
        res.render('add_case_pg3');
    }
);
router.post
(
    '/add_case_pg3',
    ensureAuthenticated,
    (req, res) =>
    {
        res.redirect('/client/dashboard');
    }
);


module.exports = router;