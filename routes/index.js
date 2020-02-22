const bcrypt = require('bcryptjs');
const passport = require('passport');
const express = require('express');
const router = express.Router();

//'User' model
const User = require('../models/User')

//home page
router.get
(
    '/',
    (req, res) =>
    {
        res.render('homepage');
    }
);

//log in handle
router.get
(
    '/login',
    (req, res) =>
    {
        res.render('login');
    }
);
router.post
(
    '/login',
    (req, res, next) =>
    {
        if(req.body.personType == c) //client
        {
            passport.authenticate
            (
                'local',
                {
                    successRedirect: '/client/dashboard',
                    failureRedirect: '/login',
                    failureFlash: true
                }
            )(req, res, next);
        }
        else //lawyer
        {
            passport.authenticate
            (
                'local',
                {
                    successRedirect: '/lawyer/dashboard',
                    failureRedirect: '/login',
                    failureFlash: true
                }
            )(req, res, next);
        }
    }
);

//log out handle
router.get
(
    '/logout',
    (req, res) =>
    {
        req.logOut();
        req.flash('success_msg', 'You are logged out...');
        res.redirect('/login');
    }
)

//register handle
router.get
(
    '/register',
    (req, res) =>
    {
        res.render('register');
    }
);
router.post
(
    '/register',
    (req, res) =>
    {
        console.log(req.body);
        
        const {personType, fname, mname, lname, email, password, password2} = req.body;

        let errors = [];
        //check required fields
        if(!personType || !fname || !mname || !lname || !email || !password || !password2)
            errors.push({message: 'Please fill in all the fields...'});
        //check whether passwords match
        if(password !== password2)
            errors.push({message: 'Passwords do not match...'});
        //check password length (>6)
        if(password.length < 6)
            errors.push({message: 'Password should be atleast 6 characters...'});
        
        if(errors.length > 0)
            res.render
            (
                'register',
                {
                    errors,
                    personType,
                    fname,
                    mname,
                    lname,
                    email,
                    password,
                    password2
                }
            );
        else //validation passed
        {
            //check if user already exists
            User.findOne
            (
                {
                    email: email
                }
            ).then
            (
                (user) =>
                {
                    if(user)
                    {
                        //user already exists
                        errors.push({message: 'e-mail is already registered...'});
                        res.render
                        (
                            'register',
                            {
                                errors,
                                personType,
                                fname,
                                mname,
                                lname,
                                email,
                                password,
                                password2
                            }
                        );
                    }
                    else
                    {
                        const new_user = new User
                        (
                            {
                                personType,
                                fname,
                                mname,
                                lname,
                                email,
                                password
                            }
                        );

                        console.log(new_user);

                        //hash password
                        bcrypt.genSalt
                        (
                            10, 
                            (err, salt) => bcrypt.hash
                            (
                                new_user.password, 
                                salt, 
                                (err, hash) =>
                                {
                                    if(err)
                                        throw err;

                                    //set plain text pass to hashed pass
                                    new_user.password = hash;
                                    //save user
                                    new_user.save().then
                                    (
                                        (user) =>
                                        {
                                            req.flash('success_msg', 'You are now registered and can log in...'); //created flash msg
                                            res.redirect('/login');
                                        }
                                    ).catch
                                    (
                                        (err) => console.log(err)
                                    );
                                }
                            )
                        );
                    }
                }
            );
        }
    }
);


module.exports = router;