// Library Imports
require('dotenv/config');
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');

// Local File Imports
const configurePassport = require('./src/config/passport-config.js');
const helpers = require('./src/helpers/hbs-helpers.js');
const { connect } = require('./src/models/conn.js');
const routes = require('./src/routes/route-handler.js');

// Server Setup and Middleware
const PORT = process.env.PORT;
const app = express();
const hbs = exphbs.create({ extname: 'hbs', helpers });
configurePassport(passport);

// Server Configurations
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.set('view cache', false);
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use('./public/img/uploads', express.static('uploads'))

// Router Configuration
app.use(routes);

// Server Startup
app.listen(PORT, async () => {
    console.log(`Express app is now listening on port: ${PORT}`);
    try {
        await connect();
        console.log(`Now connected to MongoDB`);

    } catch (err) {
        console.log('Connection to MongoDB failed: ');
        console.error(err);
    }
});
