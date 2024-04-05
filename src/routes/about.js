const { Router } = require('express');
const router = Router();

router.get('/about', (req, res) => {
    res.render('about', {
        nav_context: { isLoggedIn: req.isAuthenticated() }
    });
});

module.exports = router;