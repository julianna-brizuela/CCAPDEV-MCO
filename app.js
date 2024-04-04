// Library Imports
require('dotenv/config');
const express = require('express');
const exphbs = require('express-handlebars');

// Local File Imports
const helpers = require('#helpers/hbs-helpers.js');
const { connect } = require('#models/conn.js');
const routes = require('#routes/route-handler.js')

// Server Setup
const PORT = process.env.PORT ?? 3000;
const app = express();
const hbs = exphbs.create({ extname: 'hbs', helpers });

// Server Configurations
app.engine('hbs', hbs.engine);
app.set('view engine','hbs');
app.set('views', './views');
app.set('view cache', false);
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());

// Router Configuration
app.use(routes);

// Server Startup
app.listen(PORT, async () => {
    console.log(`Express app is now listening on port: ${process.env.PORT}`);
    try {
        await connect();
        console.log(`Now connected to MongoDB`);

    } catch (err) {
        console.log('Connection to MongoDB failed: ');
        console.error(err);
    }
});
