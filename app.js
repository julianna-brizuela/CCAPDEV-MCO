require('dotenv/config');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT;

// Configurations
app.use('/static', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine','hbs');
app.set('views', './views');
app.set('view cache', false);

// Routers
const home = require('./src/routes/home.js');
const adminRouter = require('./src/routes/adminRouter.js');
const indexRouter = require('./src/routes/indexRouter.js');
const restaurantRouter = require('./src/routes/restaurantsRouter.js');
const usersRouter = require('./src/routes/usersRouter.js');
app.use('/', home);
app.use('/', adminRouter);
app.use('/', indexRouter);
app.use(restaurantRouter);
app.use('/user', usersRouter);

// Server Startup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
