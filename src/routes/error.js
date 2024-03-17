const { Router } = require('express');
const router = Router();

router.get('/:error', (req, res) => {
    const title = "Sorry, page not found" ;
    res.status(404).render('404_error_template', { title });
});

module.exports = router;
