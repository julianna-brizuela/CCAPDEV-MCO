const express = require('express');
const database = require('../../db/database.js');

const router = express.Router();

router.post('/login', (req, res) => {
    const email = req.body['login-email'];
    const password = req.body['login-password'];
    const userDocument = database.collections['users'].find({ email, password })?.[0];

    if (userDocument)
        res.status(200).json({ 
            login_status: 'successful', 
            userID: userDocument['_id'],
        });
        
    else
        res.status(401).json({ 
            login_status: 'unsuccessful',
            userID: null,
        });
});

module.exports = router;
