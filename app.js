//Connexion to the database
const mongoose = require('mongoose');
require('dotenv').config();

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


//LINK THE DIFFERENT MODELS

require('./models/Product');
require('./models/Recipe');

//Import Controllers functions
const addProduct = require("./controller/addProduct.js")
const addRecipe = require("./controller/addRecipe")
const searchProduct = require("./controller/searchProduct")
const searchRecipe = require("./controller/searchRecipe")
const showProduct = require("./Controller/showProduct")

const db_searchProduct = require("./MongoDB management/db_searchProduct")

//Creation of a server
const express = require("express")
const path = require('path');
const bodyParser = require('body-parser');



app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public')); //Load files from 'public' ->CSS
app.use(bodyParser.urlencoded({ extended: true }));


//_________________



app.get("/", function (req, res) {
    res.render('form', { title: 'Registration form' });
})

app.get("/add/Recipe", function (req, res) {
    res.render('newrecipe', { title: 'Add Recipe' })
})

app.get("/add/Product", function (req, res) {
    res.render('newproduct', { title: 'Add Product' })
})

app.get("/search/Product", async (req, res) => {
    search = searchProduct(req.query)
    var products = await db_searchProduct(search[0])
    res.render('searchProduct', showProduct(products, search[1]))
})

app.get("/search/Recipe", async (req, res) => {
    searchRecipe(req.query)
})

app.post("/addProduct", function (req, res) {
    res.redirect("/search/Product")
    product = addProduct(req.body)
    
    const db_addProduct = require("./MongoDB management/db_addProduct")
    db_addProduct(product)
})

app.post("/addRecipe", (req, res) => {
    res.redirect("/search/Recipe")
    recipe = addProduct(req.body)
    
    const db_addProduct = require("./MongoDB management/db_addRecipe")
    db_addProduct(recipe)
})


app.get('/recipeDetail/:recipeID', function(req, res) {
    console.log(req.params)
    return res.render('recipeDetail', {tile:"Détails", id:req.params.recipeID})
  }); 

app.listen(8000)







// const express = require("express")
// app = express()

// app.get("/",function(req, res){
//     res.end("<h1> Hello World 3 </h1>")
// })

// app.listen(8000)



// const express = require('express');
// const path = require('path');
// const routes = require('./routes/index');
// const bodyParser = require('body-parser');

// const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', routes);
// app.use(express.static('public')); //Load files from 'public' ->CSS

// module.exports = app;