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
            return res.redirect('/logout');
        else
            return next();
    }
}