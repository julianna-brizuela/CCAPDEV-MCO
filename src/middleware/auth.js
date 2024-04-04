module.exports = {
    
    // Used for routers where client requires a session
    requireAuth: function (req, res, next) {
        if (!req.isAuthenticated())
            return res.redirect('/');
            // return res.redirect('/login');
        next();
    },

    // Used for logins/registers since client must not have a session
    requireNoAuth: function (req, res, next) {
        if (req.isAuthenticated())
            return res.redirect('/');
        next();
    },
};
