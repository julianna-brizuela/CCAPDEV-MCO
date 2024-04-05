const express = require('express');
const { requireAuth } = require('#middleware/auth.js');
const { restrictToOwnProfile } = require('#middleware/restrict-profile.js');
const User = require('#models/Users.js');

const router = express.Router();


router.get('/user', requireAuth, (req, res) => {
    res.redirect(`/user/${req.user.username}`);
});

router.get('/user/:username', requireAuth, restrictToOwnProfile, async (req, res) => {
    const user = await User
        .findById(req.user._id)
        .populate('reviews')
        .lean();

    console.log(user)

    res.render('user',  {
        nav_context: {
            isLoggedIn: req.isAuthenticated(),
        },

    });
});

router.get('/user/edit', requireAuth, (req, res) => {
    res.redirect(`/user/${req.user.username}/edit`);
});

router.get('/user/:username/edit', requireAuth, restrictToOwnProfile, (req, res) => {
    res.redirect(`/user/${req.user.username}/edit`);
});

module.exports = router;
