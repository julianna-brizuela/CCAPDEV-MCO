require('dotenv/config');
const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT;

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
app.use(usersRouter);
app.use('/', adminRouter);
app.use('/', indexRouter);
app.use(restaurantRouter);




//  // ---------- MAKESHIFT DATABASE METHODS  ---------- 
//  // Importing the db object
//  const database = require('./db/database.js')
//  let documents;

//  // Creating a new document
//  database.collections['users'].insertOne( {_id: 'Skibidi Toilet'} );
//  documents = database.collections['users'].find({_id: 'Skibidi Toilet'})[0];
//  console.log('---------- CREATE/INSERT ----------');
//  console.log(documents);

//  // Finding documents (returns an array with the matched documents)
//  documents = database.collections['users'].find({ name: 'Josh Hutcherson' });
//  console.log('\n\n---------- READ/FIND ----------');
//  console.log(documents);

//  // Updating one document (updates the first document matched by the query)
//  database.collections['users'].updateOne({ name: 'Josh Hutcherson' }, { name: 'JOSH HUTCHERSON' });
//  documents = database.collections['users'].find({ name: 'JOSH HUTCHERSON' })[0];
//  console.log('\n\n---------- UPDATE ONE ----------');
//  console.log(documents);

//  // Updating many documents (updates all documents matched by the query)
//  database.collections['users'].updateOne({ name: 'JOSH HUTCHERSON' }, { name: 'Josh Hutcherson' });
//  documents = database.collections['users'].find({ name: 'Josh Hutcherson' });
//  console.log('\n\n---------- UPDATE MANY ----------');
//  console.log(documents);

//  // Deleting a document (that match the query)
//  database.collections['restaurants'].deleteOne({ restaurant_name: 'Manam' });
//  documents = database.collections['restaurants'];
//  console.log('\n\n---------- DELETE ONE ----------');
//  console.log(documents);

//  // Deleting many documents (that match the query)
//  database.collections['restaurants'].deleteMany({ restaurant_name: 'Botejyu' });
//  documents = database.collections['restaurants'];
//  console.log('\n\n---------- DELETE MANY ----------');
//  console.log(documents);

//  // ---------- MAKESHIFT DATABASE METHODS  ---------- 

// Server Startup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
