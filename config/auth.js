module.exports = {
    ensureAuthenticated: (req, res, next) =>
    {
        if(req.isAuthenticated())
            return next();

        req.flash('error_msg', 'Please log in to view this resource...');
        res.redirect('/login');
    },

    notIfLoggedIn: (req, res, next) =>
    {
        if(req.isAuthenticated())
        {
            req.flash('error_msg', 'Please log out to view this resource...');
            return res.redirect('/client/dashboard');
        }
        else
            return next();
    }
}