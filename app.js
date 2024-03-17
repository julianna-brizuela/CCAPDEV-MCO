// Library Imports
require('dotenv/config');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');

// Local File Imports
const helpers = require('#helpers/helper.js');
const routes = require('#routes/handlers.js');

// Express Configuration
const PORT = process.env.PORT ?? 3000;
const app = express();
const hbs = exphbs.create({ extname: 'hbs', helpers });

// Configurations
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/src/views'));
app.set('view cache', false);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

// Configure Routers
app.use(routes);

// Server Startup
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});
