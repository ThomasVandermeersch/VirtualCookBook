// const express = require("express")
// app = express()

// app.get("/",function(req, res){
//     res.end("<h1> Hello World 3 </h1>")
// })

// app.listen(8000)



const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);

module.exports = app;

