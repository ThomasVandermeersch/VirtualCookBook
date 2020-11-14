//CONNECT THE APPLICATION WITH A DATABASE
require('dotenv').config();

const mongoose = require('mongoose');

//LINK THE DIFFERENT MODELS

require('./Models/Product');
require('./Models/Recipe');

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

const addProduct = require("./Controller/addProduct.js")
const addRecipe = require("./Controller/addRecipe")
const searchProduct = require("./Controller/searchProduct")
const searchRecipe = require("./Controller/searchRecipe")

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