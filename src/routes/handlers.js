const { Router } = require('express');
const router = Router();

const home = require('#routes/home.js');
const auth = require('#routes/auth.js');
const adminRouter = require('#routes/adminRouter.js');
const indexRouter = require('#routes/indexRouter.js');
const restaurantRouter = require('#routes/restaurantsRouter.js');
const profile = require('#routes/user-profile.js');
const error = require('#routes/error.js');

router.use(home);
router.use(auth);
router.use(adminRouter);
router.use(indexRouter);
router.use(restaurantRouter);
router.use(profile);
router.use(error);

module.exports = router;
