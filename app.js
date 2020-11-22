
//Website security
const bcrypt = require('bcrypt')
const users = []
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
require('./models/User')

//Import Controllers functions
const addProduct = require("./controller/addProduct.js")
const addRecipe = require("./controller/addRecipe")
const searchProduct = require("./controller/searchProduct")
const searchRecipe = require("./controller/searchRecipe")
const showProduct = require("./Controller/showProduct")
const showRecipe = require("./Controller/showRecipe")
const db_searchProduct = require("./MongoDB management/db_searchProduct")
const db_searchRecipe = require("./MongoDB management/db_searchRecipe")

//Creation of a server
const express = require("express")
const path = require('path');
const bodyParser = require('body-parser');
const db_addRecipe = require('./MongoDB management/db_addRecipe');



app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public')); //Load files from 'public' ->CSS
app.use(bodyParser.urlencoded({ extended: true }));

const passport = require('passport')
const initializePassport = require('./passport-config')

const db_searchUser = require('./MongoDB management/db_searchUser')
initializePassport(
    passport,
    async (email)=> await db_searchUser({'email':email,type:'local'}),
    async (_id)=>  await db_searchUser({'_id':_id})
    )

const flash = require('express-flash')
const session = require('express-session')
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())






app.get("/login",checkNotAuthenticated,function (req, res){
    res.render('login', { title: 'Log In' })
})

app.post('/loginPOST',passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash: true   
}))

app.get('/forget', function(req,res){
    res.end("<h1> Pas de chance </h1>")
})
app.get("/register",checkNotAuthenticated,async function (req,res){
    res.render('register', {title:"Register"})
})

app.post("/registerPOST", async function(req,res){
    res.redirect("/login")
    const register = require('./Controller/register')
    const registerRep = await register(req.body)
    //The add to the database
    const db_registerUser = require('./MongoDB management/db_registerUser')
    db_registerUser(registerRep)
})
app.get("/",checkAuthenticated, function (req, res) {
    //console.log(req)
    console.log(req.user)
    console.log(req.user._id)
    res.render('home', { title: 'Registration form', name: req.user.name });
})

app.get("/add/Recipe",checkAuthenticated, function (req, res) {
    res.render('newrecipe', { title: 'Add Recipe' })
})

app.get("/add/Product", checkAuthenticated, function (req, res) {
    res.render('newproduct', { title: 'Add Product' })
})

app.get("/search/Product",checkAuthenticated, async (req, res) => {
    search = searchProduct(req.query)
    var products = await db_searchProduct(search[0])
    res.render('searchProduct', showProduct(products, search[1]))
})

app.get("/search/Recipe",checkAuthenticated, async (req, res) => {
    search = searchRecipe(req.query)
    var recipes = await db_searchRecipe(search[0])
    res.render('searchRecipe', showRecipe(recipes, search[1]))})

app.post("/addProduct",checkAuthenticated, function (req, res) {
    res.redirect("/search/Product")
    product = addProduct(req.body)
    
    const db_addProduct = require("./MongoDB management/db_addProduct")
    db_addProduct(product)
})

app.post("/addRecipe",checkAuthenticated, (req, res) => {
    res.redirect("/search/Recipe")
    recipe = addRecipe(req.body)
    
    const db_addRecipe = require("./MongoDB management/db_addRecipe")
    db_addRecipe(recipe)
})


app.get('/recipeDetail/:recipeID', checkAuthenticated,function(req, res) {
    console.log(req.params)
    return res.render('recipeDetail', {tile:"Détails", id:req.params.recipeID})
  }); 



  function checkAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(8000)