const express = require('express');
const database = require('../../db/database.js');

const router = express.Router();

router.post('/login', (req, res) => {
    const email = req.body['login-email'];
    const password = req.body['login-password'];
    const userDocument = database.collections['users'].find({ email, password })?.[0];

    if (userDocument) {
        const login_status = 'successful';
        const userID = userDocument['_id'];
        res.status(200).json({ login_status, userID });
    }

    else {
        res.status(401).json({ login_status: 'unsuccessful' });
    }
});

module.exports = router;
