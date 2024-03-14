const express = require('express');
const database = require('../../db/database.js');

const router = express.Router();

router.post('/auth/login', (req, res) => {

    // const email = req.body['login-email'];
    // const password = req.body['login-password'];
    // const document = database.collections['users'].find({ email, password })[0] ?? [];
    
    // if (document.length !== 0)
    //     res.redirect('/');

    // else
    //     res.send('lol ur details are wrong account first');

});

module.exports = router;
