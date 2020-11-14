//CONNECT THE APPLICATION WITH A DATABASE
require('dotenv').config();

const mongoose = require('mongoose');

//LINK THE DIFFERENT MODELS

require('./models/Product');
require('./models/Recipe');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


//Creation of a server
const express = require("express")
app = express()

const addProduct = require("./controller/addProduct.js")
const addRecipe = require("./controller/addRecipe")
const searchProduct = require("./controller/searchProduct")
const searchRecipe = require("./controller/searchRecipe")

app.get("/",function(req, res){
    res.end("<h1> Hello World </h1>")
})


app.get("/search/Product", async (req,res) =>{
  searchProduct(req.query,res)
})

app.get("/search/Recipe", async (req,res) =>{
  searchRecipe(req.query,res)
})

app.post("/addProduct",function(req,res){
    res.end("<h1> Document inserted </h1>");
    addProduct(req.query)
})

app.post("/addRecipe", (req,res)=>{
    res.end("<h1> Document inserted </h1>");
    addRecipe(req.query)
})

app.listen(8000)











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



