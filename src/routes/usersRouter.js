const { Router } = require('express');
const userRouter = Router();
const express = require('express');
const database = require('../../db/database.js');

userRouter.get('user/:username', async (req, res) => {
    let username_route = req.params.username;
    username_route = decodeURIComponent(username_route);
    console.log("USER ROUTE")
    console.log(username_route)

    function findUser(user) {
        let username = user.username;
        username = username.replace(/\s/g, '');
        username = username.toLowerCase();
        return username===username_route;
    }

    let user = database.collections['users'].documents.find(findUser);

    if (user) {
        res.locals.title = "MUNCH | " + user['username'];
    }

    res.render("user", user);
})

module.exports = userRouter;
