const { Router } = require('express');
const userRouter = Router();
const express = require('express');
const router = express.Router();

userRouter.get('/:username', (req, res)=> {
    let username_route = req.params.username;

    function findUser(user) {
        let username = user.username;
        username = restaurant_name.replace(/\s/g, '');
        username = restaurant_name.toLowerCase();
        return username===username_route;
    }

    let user = database.collections['users'].documents.find(findUser);

    if (user) {
        res.locals.title = "MUNCH | " + user['username'];
    }

    res.render("user", user);
})

module.exports = router;
