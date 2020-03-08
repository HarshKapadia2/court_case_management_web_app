const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash'); /*required to store msgs in a session and show them later 
(eg: the success msg after registering in this project). 
Not the same as the other error msgs, as those were just rendering a view with those boxes.*/
const session = require('express-session');
const passport = require('passport');
const express = require('express');
const app = express();

//passport config
require('./config/passport')(passport);

//db config
const db = require('./config/keys').MongoURI; //for MongoDB Atlas
//const db = 'mongodb://127.0.0.1:27017/court_case_management' //for local MongoDB

//db connection
mongoose.connect
(
    db, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then
(
    () => console.log('MongoDB Atlas connected...')
    //() => console.log('MongoDB Local connected...')
).catch
(
    (err) => console.log(err)
);

//middleware
/*static folder to serve html, css and imgs*/
app.use(express.static(__dirname + '/public'));
/*ejs*/
app.use(expressLayouts);
app.set('view engine', 'ejs');
/*body parser*/
app.use(express.urlencoded({extended: false}));
/*express session*/
app.use
(
    session
    (
        {
            secret: require('./config/secret.js').secret,
            resave: true,
            saveUninitialized: true
        }
    )
);
/*passport - required for log in (authentication) - the position of these 2 lines matter. They should be below the session...*/
app.use(passport.initialize());
app.use(passport.session());
/*connect flash*/
app.use(flash());
/*Global var middleware for diff colours for diff msgs (error msgs, flash msgs, etc)*/
app.use
(
    (req, res, next) =>
    {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    }
);

//Routes
app.use('/', require('./routes/index'));
app.use('/client', require('./routes/client'));
app.use('/lawyer', require('./routes/lawyer'));


const PORT = process.env.PORT || 5000;
app.listen
(
    PORT,
    (err) =>
    {
        if(err)
            throw err;

        console.log(`Server started on PORT ${PORT}...`);
    }
);