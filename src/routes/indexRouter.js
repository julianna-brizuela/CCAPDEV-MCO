const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/search', (req, res) => {

    const searchValue = req.query.key;


    res.send(`You searched for: ${searchValue}`);
});

module.exports = indexRouter;