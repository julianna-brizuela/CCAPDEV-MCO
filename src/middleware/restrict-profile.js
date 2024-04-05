module.exports = {
    restrictToOwnProfile: (req, res, next) => {
        if (req.params.username != req.user.username)
            return res.redirect('/');
        next();
    },
};