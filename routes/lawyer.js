const express = require('express');
const router = express.Router();

//include auth fn
const {ensureAuthenticated} = require('../config/auth');

//include model
const LawyerDetails = require('../models/LawyerDetails');
const CaseDetails = require('../models/CaseDetails');
const User = require('../models/User');

//dashboard
router.get
(
    '/dashboard',
    ensureAuthenticated,
    async (req, res) =>
    {
        if(req.user.is_profile_complete === "N")
            res.redirect('/lawyer/profile');
        else
            await CaseDetails.find
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

//profile
router.get
(
    '/profile',
    ensureAuthenticated,
    (req, res) =>
    {
        res.render('lawyer_profile', {f_name: req.user.fname});
    }
);
router.post
(
    '/profile',
    ensureAuthenticated,
    async (req, res) =>
    {
        //comma separated preferred case types to arr
        const pref_case_types = req.body.pref_case_types;
        const pref_case_types_arr = pref_case_types.split(",");
        pref_case_types_arr.forEach((case_type) => case_type.trim());
        
        const new_lawyer_details = new LawyerDetails
        (
            {
                lawyer_id: req.user._id,
                bar_council_id: req.body.bar_id,
                company_name: req.body.company_name,
                pref_case_types: pref_case_types_arr,
                exp_yrs: req.body.exp_yrs,
                experience: req.body.exp,
                fees: req.body.fees,
                fee_descp: req.body.fee_descp,
                dob: req.body.dob,
                age: req.body.age,
                ph_no: req.body.ph_no
            }
        );

        await new_lawyer_details.save().then
        (
            (new_lawyer_obj) =>
            {
                User.updateOne
                (
                    {
                        _id: req.user._id
                    },
                    {
                        $set: {
                            is_profile_complete: "Y"
                        }
                    }
                ).then
                (
                    res.redirect('/lawyer/dashboard')
                ).catch
                (
                    (err) => console.log(err)
                );
            }
        ).catch
        (
            (err) => console.log(err)
        );
    }
);


module.exports = router;