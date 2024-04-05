const bcrypt = require('bcrypt');
const express = require('express');
const { requireAuth } = require('#middleware/auth.js');
const { restrictToOwnProfile } = require('#middleware/restrict-profile.js');
const Admin = require('#models/Admins.js');
const User = require('#models/Users.js');
const upload = require('#middleware/upload-profile.js')

const router = express.Router();

router.get('/user', requireAuth, (req, res) => {
    res.redirect(`/user/${req.user.username}/profile`);
});

router.get('/user/edit', requireAuth, (req, res) => {
    res.redirect(`/user/${req.user.username}/edit`);
});

router.post('/user/edit', requireAuth, async (req, res) => {
    if (req.body.password !== req.body['confirm-password']) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/user/edit');
    }

    try {
        let document_exists = 
            await User.findOne({ username: req.body.username }) ||
            await Admin.findOne({ username: req.body.username });

        if (document_exists) {
            req.flash('error', 'Username already exists');
            return res.redirect('/user/edit');
        }

        const user = await User
            .findByIdAndUpdate(req.user._id, {
                username: req.body.username,
                fullname: req.body.fullname,
                password: await bcrypt.hash(req.body.password, 10),
            })
            .lean();

        } catch(err) {
            console.error(err);   
        }
        res.redirect('/user');
});

router.delete('/user/delete', requireAuth, async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.user._id);
        const deletion_status = result ? 'Account Deleted Successfully' : 'Something went wrong';

        return req.logout(err => {
            if (err) return next(err);
            res.render('user-delete',  {
                nav_context: { hide: true },
                deletion_status,
            });
        });

    } catch(err) {
        console.error(err);
        req.flash('Something went wrong');
        res.render('user-delete',  {
            nav_context: { hide: true },
            deletion_status: 'Something went wrong',
        });
    }
});

router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User
            .findOne({ username: { '$regex': req.params.username, $options: 'i' }})
            .populate({
                path: 'reviews',
                populate: { path: 'restaurant' },
            })
            .lean();
        
        switch (req.query['sort-by']) {
            case 'latest':
                user.reviews.sort((a, b) => new Date(b.date_of_review) - new Date(a.date_of_review));
                break;

            case 'oldest':
                user.reviews.sort((a, b) => new Date(a.date_of_review) - new Date(b.date_of_review));
                break;

            case 'highest':
                user.reviews.sort((a, b) => b.review_rating - a.review_rating);
                break;

            case 'lowest':
                user.reviews.sort((a, b) => a.review_rating - b.review_rating);
                break;
        }

        res.render('profile-view',  {
            nav_context: { isLoggedIn: req.isAuthenticated() },
            selected: {
                latest: req.query['sort-by'] ? req.query['sort-by'] == 'latest' : true,
                oldest: req.query['sort-by'] == 'oldest',
                highest: req.query['sort-by'] == 'highest',
                lowest: req.query['sort-by'] == 'lowest',
            },
            user,
        });

    } catch(err) {
        console.error(err)
        res.redirect('back');
    }
});

router.get('/user/:username/profile', requireAuth, restrictToOwnProfile, async (req, res) => {
    try {
        const user = await User
            .findById(req.user._id)
            .populate({
                path: 'reviews',
                populate: { path: 'restaurant' },
            })
            .lean();

        console.log(req.query['sort-by'])
        
        switch (req.query['sort-by']) {
            case 'latest':
                user.reviews.sort((a, b) => new Date(b.date_of_review) - new Date(a.date_of_review));
                break;

            case 'oldest':
                user.reviews.sort((a, b) => new Date(a.date_of_review) - new Date(b.date_of_review));
                break;

            case 'highest':
                user.reviews.sort((a, b) => b.review_rating - a.review_rating);
                break;

            case 'lowest':
                user.reviews.sort((a, b) => a.review_rating - b.review_rating);
                break;
        }

        res.render('user',  {
            nav_context: { isLoggedIn: req.isAuthenticated() },
            selected: {
                latest: req.query['sort-by'] ? req.query['sort-by'] == 'latest' : true,
                oldest: req.query['sort-by'] == 'oldest',
                highest: req.query['sort-by'] == 'highest',
                lowest: req.query['sort-by'] == 'lowest',
            },
            user,
        });

    } catch(err) {
        console.error(err)
        res.redirect('/user');
    }
});

router.get('/user/:username/edit', requireAuth, restrictToOwnProfile, async (req, res) => {
    try {
        const user = await User
            .findById(req.user._id)
            .lean();
    
        res.render('user-edit', {
            nav_context: { isLoggedIn: req.isAuthenticated() },
            user,
        });

    } catch(err) {
        console.error(err)
        res.redirect('/user');
    }
});

router.post('/user/upload', requireAuth, upload.single('profile'), async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.user._id,
            {pfp: req.file.filename},
            {new: true}
        );
    } catch(err) {
        console.error(err)
    }
    res.redirect('/user');
});

module.exports = router;
