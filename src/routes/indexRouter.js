const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/search', (req, res) => {
    // Retrieve the search value from the query parameters
    const searchValue = req.query.key;

    // You can now use the searchValue in your application logic
    // For example, you might perform a search operation based on this value

    // Send a response back to the client
    res.send(`You searched for: ${searchValue}`);
});


module.exports = indexRouter;