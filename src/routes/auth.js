const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');
const { requireAuth, requireNoAuth } = require('#middleware/auth.js');
const User = require('#models/Users.js');
const Admin = require('#models/Admins.js');

const router = express.Router();
router.use(express.urlencoded({ extended: false }));

router.get('/login', requireNoAuth, (req, res) => {
    res.render('login', {
        title: 'munch | Login',
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
        title: 'munch | Sign up',
        nav_context: { hide: true },
    });
});

router.post('/signup', requireNoAuth, async (req, res, next) => {
    if (req.body.password !== req.body['confirm-password']) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/signup');
    }

    try {
        let document = (await Admin.findOne({ username: req.body.username }) || await User.findOne({ username: req.body.username }));
        if (document) {
            req.flash('error', 'Username already exists');
            return res.redirect('/signup');
        }

        document = (await Admin.findOne({ email: req.body.email }) || await User.findOne({ email: req.body.email }));
        if (document) {
            req.flash('error', 'Email is already registered');
            return res.redirect('/signup');
        }

        const accountTypeCollection = (req.body['user-type'] === 'admin') ? Admin : User;
        const password = await bcrypt.hash(req.body.password, 10);
        const account = (await accountTypeCollection.create({
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password,
        })).toObject();

        console.log(account)

        req.login(account, err => {
            if (err) return next(err);
            return res.redirect('/');
        });

    } catch(err) {
        console.error(err);
        req.flash('error', 'An error occured. Please try again later.');
    }
});

router.delete('/logout', requireAuth, (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;
