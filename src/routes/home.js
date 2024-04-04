const express = require('express');
const Admin = require('#models/Admins.js');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.isAuthenticated() && await Admin.findOne({ _id: req.user._id })) {
        res.redirect(`/${req.user.username}/restaurant`);
        return;
    }

    res.render('index', {
        nav_context: {
            isLoggedIn: req.isAuthenticated(),
        },
    });
});

router.get('/home', (req, res) => {
    res.redirect('/');
});

router.get('/testing', (req, res) => {
    res.render('user');
});

module.exports = router;
