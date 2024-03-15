const express = require('express');
const database = require('../../db/database.js');

const router = express.Router();

router.post('/login', (req, res) => {
    const email = req.body['login-email'];
    const password = req.body['login-password'];
    const userType = req.body['user-type'] + 's';
    const userDocument = database.collections[userType].find({ email, password })?.[0];
    console.log('Requested')

    if (userDocument) {
        res.status(200).json({ 
            login_status: 'successful', 
            userID: userDocument['_id'],
            username: userDocument['username'],
        });
    } else {
        res.status(401).json({ 
            login_status: 'unsuccessful',
            userID: null,
            username: null,
        });
    }
});

router.post('/signup', (req, res) => {
    console.log(req.body)
    const firstname = req.body['first-name'];
    const lastname = req.body['last-name'];
    const email = req.body['signup-email'];
    const password = req.body['signup-password'];
    const confirmPassword = req.body['confirm-password'];

    const userDocument = database.collections['users'].find({ email, password })?.[0];

    if (!userDocument) {
        const document = {
            _id: (new Date()).toISOString(),
            username: `${firstname}_${lastname}`,
            name: `${firstname} ${lastname}`,
            email,
            password,
            pfp: null,
            reviews: [],
        };

        database.collections['users'].insertOne(document);
        console.log(database.collections['users'].find(document));

        res.status(200).json({ 
            signup_status: 'successful',
            userID: document['_id'],
            username: document['username'],
        });

    } else {
        res.status(401).json({ 
            signup_status: 'unsuccessful',
            userID: null,
            username: null,
        });
    }
});

module.exports = router;
