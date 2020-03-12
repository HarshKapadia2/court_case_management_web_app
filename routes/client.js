const {ObjectId} = require('mongodb');
const express = require('express');
const router = express.Router();

//include auth fn
const {ensureAuthenticated} = require('../config/auth');

//include model
const CaseDetails = require('../models/CaseDetails');
const User = require('../models/User');

//dashboard
router.get
(
    '/dashboard',
    ensureAuthenticated,
    async (req, res) =>
    {
        await CaseDetails.find
        (
            {
                client_id: ObjectId(req.user.id)
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

//case details
router.get
(
    '/display_case_details/:case_id',
    ensureAuthenticated,
    async (req, res) =>
    {
        await CaseDetails.find
        (
            {
                _id: ObjectId(req.params.case_id)
            }
        ).then
        (
            (case_details) =>
            {
                const user_type = req.user.personType;
                const {_id, case_name, case_type, case_descp, lawyer_id, court_case_no, court_type, h_date} = case_details[0];

                res.render('display_case_details', {_id, user_type, case_name, case_type, case_descp, lawyer_id, court_case_no, court_type, h_date});
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
    async (req, res) =>
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

        await new_case_details.save().then
        (
            (new_case_obj) =>
            {
                req.flash('case_id', new_case_obj._id);
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
        await User.find
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
    async (req, res) =>
    {
        const case_id = req.flash('case_id')[0]
        req.flash('caseId', case_id);

        await CaseDetails.updateOne
        (
            {
                _id: case_id
            },
            {
                $set: {
                    lawyer_id: ObjectId(req.body.lawyer_id)
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
    async (req, res) =>
    {
        const case_id = req.flash('caseId')[0];
        const date = new Date(req.body.h_date);
        await CaseDetails.updateMany
        (
            {
                _id: case_id
            },
            {
                $set: {
                    court_type: req.body.court_type,
                    court_case_no: req.body.court_case_no,
                    h_date: date
                }
            }
        ).then
        (
            res.redirect('/client/dashboard')
        ).catch
        (
            (err) => console.log(err)
        );
    }
);


module.exports = router;