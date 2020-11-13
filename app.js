// const express = require("express")
// app = express()

// app.get("/",function(req, res){
//     res.end("<h1> Hello World 3 </h1>")
// })

// app.listen(8000)



const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static('public')); //Load files from 'public' ->CSS

module.exports = app;


