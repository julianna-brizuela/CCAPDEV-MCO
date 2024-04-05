const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');
const { requireAuth, requireNoAuth } = require('../middleware/auth.js');
const Admin = require('../models/Admins.js');
const User = require('../models/Users.js');

const router = express.Router();
router.use(express.urlencoded({ extended: false }));

router.get('/login', requireNoAuth, (req, res) => {
    res.render('login', {
        title: 'MUNCH | Login',
        nav_context: { hide: true },
    });
});

router.post('/login', requireNoAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.get('/signup', requireNoAuth, (req, res) => {
    res.render('signup', {
        title: 'MUNCH | Sign up',
        nav_context: { hide: true },
    });
});

router.post('/signup', requireNoAuth, async (req, res, next) => {
    if (req.body.password !== req.body['confirm-password']) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/signup');
    }

    try {
        let document_exists = 
            await User.findOne({ username: req.body.username }) ||
            await Admin.findOne({ username: req.body.username });
            
        if (document_exists) {
            req.flash('error', 'Username already exists');
            return res.redirect('/signup');
        }

        document = await User.findOne({ email: req.body.email });
        if (document) {
            req.flash('error', 'Email is already registered');
            return res.redirect('/signup');
        }

        const password = await bcrypt.hash(req.body.password, 10);
        const user = (await User.create({
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password,
        })).toObject();

        // console.log(user)

        req.login(user, err => {
            if (err) return next(err);
            return res.redirect('/');
        });

    } catch(err) {
        console.error(err);
        req.flash('error', 'An error occured. Please try again later.');
    }
});

// router.get('/testing', (req, res) => {
//     if (req.isAuthenticated()) {
//         // Accessing user object
//         const user = req.user;
//         // Now you can use the user object as needed
//         console.log(user);
//     } else {
//         res.redirect('/login');
//     }
// });

router.delete('/logout', requireAuth, (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;
