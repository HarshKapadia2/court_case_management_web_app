//creating local strategy
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//load User model
const User = require('../models/User');

module.exports = (passport) => 
{
    passport.use
    (
        new LocalStrategy
        (
            {usernameField: 'email'},
            (email, password, done) => //theses are user passed in email and pass
            {
                //match user
                User.findOne
                (
                    {
                        email: email
                    }
                ).then
                (
                    (user) =>
                    {
                        if(!user) //if no match
                            return done(null, false, {message: 'That e-mail is not registered...'});

                        //else, match password
                        bcrypt.compare
                        (
                            password, 
                            user.password, 
                            (err, isMatch) =>
                            {
                                if(err)
                                    throw err;

                                if(isMatch)
                                    return done(null, user);
                                else
                                    return done(null, false, {message: 'Password incorrect...'});
                            }
                        );
                    }
                ).catch
                (
                    (err) => console.log(err)
                );
            }
        )
    );

    //methods to serialize and de-serialize user
    passport.serializeUser
    (
        (user, done) =>
        {
            done(null, user.id);
        }
    );
      
    passport.deserializeUser
    (
        (id, done) =>
        {
            User.findById
            (
                id, 
                (err, user) =>
                {
                    done(err, user);
                }
            );
        }
    );
}