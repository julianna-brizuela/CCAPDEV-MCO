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

module.exports = router;
