require('dotenv/config');
const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT;

const { connect } = require('./src/models/conn.js');

// Configurations
app.use('/static', express.static(__dirname + '/public'));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    helpers: {
        'toLink': function (text) { 
            if (text) {
                text = text.replace(/\s/g, '');
                return text.toLowerCase(); 
            }
            
        },
        'isEqual': function(arg1, arg2) {
            if (arg1 === arg2) { 
                return 1
            } else {
                return 0
            } 
        }
    } 
}));
app.set('view engine','hbs');
app.set('views', './views');
app.set('view cache', false);

// Routers
const home = require('./src/routes/home.js');
const auth = require('./src/routes/auth.js');
const adminRouter = require('./src/routes/adminRouter.js');
const indexRouter = require('./src/routes/indexRouter.js');
const restaurantRouter = require('./src/routes/restaurantsRouter.js');
const usersRouter = require('./src/routes/usersRouter.js');

app.use(express.json());
app.use('/', home);
app.use('/', auth);
app.use('/', adminRouter);
app.use('/', indexRouter);
app.use(restaurantRouter);
app.use(usersRouter);

// Server Startup
app.listen(process.env.PORT, async function() {
    console.log(`express app is now listening on port ${process.env.PORT}`);
    try {
        await connect();
        console.log(`Now connected to MongoDB`);
    } catch (err) {
        console.log('Connection to MongoDB failed: ');
        console.error(err);
    }
});
