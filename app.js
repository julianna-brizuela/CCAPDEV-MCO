const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3000;

app.use("/static", express.static(__dirname + "/public"));

app.engine("hbs", exphbs.engine({extname: 'hbs'}));

app.set("view engine","hbs");

app.set("views", "./views");

app.set("view cache", false);

console.log("success");

app.listen(PORT);
