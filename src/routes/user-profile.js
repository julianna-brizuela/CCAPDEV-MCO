const express = require('express');
const { requireAuth } = require('#middleware/auth.js');
const { restrictToOwnProfile } = require('#middleware/restrict-profile.js');
const User = require('#models/Users.js');

const router = express.Router();


router.get('/user', requireAuth, (req, res) => {
    res.redirect(`/user/${req.user.username}/profile`);
});

router.get('/user/:username/profile', requireAuth, restrictToOwnProfile, async (req, res) => {
    const user = await User
        .findById(req.user._id)
        .populate([{
            path: 'reviews',
            populate: { path: 'restaurant' },
        }])
        .lean();

    console.log(user)

    res.render('user',  {
        nav_context: { isLoggedIn: req.isAuthenticated() },
        user,
    });
});

router.get('/user/edit', requireAuth, (req, res) => {
    res.redirect(`/user/${req.user.username}/edit`);
});

router.get('/user/:username/edit', requireAuth, restrictToOwnProfile, async (req, res) => {
    const user = await User
        .findById(req.user._id)
        .populate('reviews')
        .lean();
    const reviews = user.reviews;
    
    res.render('user-edit', {
        nav_context: {
            isLoggedIn: req.isAuthenticated(),
        },
    });
});

module.exports = router;
