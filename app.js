//Connexion to the database
require('dotenv').config();
const connexion = require('./MongoDBmanagement/db_connect')
connexion()

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
const register = require('./Controller/register')
const showDetailRecipe = require("./Controller/showDetailRecipe")

//Import MongoDBmanagement functions
const db_searchProduct = require("./MongoDBmanagement/db_searchProduct")
const db_searchRecipe = require("./MongoDBmanagement/db_searchRecipe")
const db_addProduct = require("./MongoDBmanagement/db_addProduct")
const db_addRecipe = require('./MongoDBmanagement/db_addRecipe');
const db_registerUser = require('./MongoDBmanagement/db_registerUser')



//Creation of a server
const express = require("express")
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')
const initializePassport = require('./Controller/passport-config')
const db_searchUser = require('./MongoDBmanagement/db_searchUser')
const db_facebookUser = require('./MongoDBmanagement/db_insertFacebookUser')
const flash = require('express-flash')
const methodOverride = require('method-override')

//initialasing passport (module to authenticate user)
initializePassport(
    passport,
    async (email)=> await db_searchUser({'email':email,type:'local'}),
    async (_id)=>  await db_searchUser({'_id':_id}),
    async (profileId)=> await db_searchUser({'facebook.id': profileId ,type:'facebook'}),
    async (facebookUser)=> db_facebookUser(facebookUser)
    )

//further user initialisation
app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public')); //Load files from 'public' -> (CSS, image, JS...)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{_expires : 90*60*1000 }, // time im ms before timeout}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


//ROUTES
//APP.GET

//Show login page
app.get("/login",checkNotAuthenticated,function (req, res){
    res.render('login', { title: 'Log In' })
})

//Show log out page 
app.get('/logout',checkAuthenticated,(req,res)=>{
    res.render('logout', {title:"Log Out"})
})

//Show forget password page
app.get('/forget', function(req,res){
    res.end("<h1> Pas de chance </h1>")
})

//Show register page
app.get("/register",checkNotAuthenticated,async function (req,res){
    res.render('register', {title:"Register"})
})

//Show home page
app.get("/",checkAuthenticated, function (req, res) {
    res.render('home', { title: 'CookBook', name: req.session.passport.user });
})

//Show add recipe page formular
app.get("/add/Recipe",checkAuthenticated, function (req, res) {
    res.render('newrecipe', { title: 'Add Recipe' })
})

//Show add product page formular
app.get("/add/Product", checkAuthenticated, function (req, res) {
    res.render('newproduct', { title: 'Add Product' })
})

//Show a page that returns the different products to the use.
app.get("/search/Product",checkAuthenticated, async (req, res) => {
    //1. format the search method
    search = searchProduct(req.query)  //returns an array  [category,search]
    //where category is the selected category filter and search is the name filter.
    
    //2. Search in database with the category filter
    var products = await db_searchProduct(search[0])

    //3. Show the page
    res.render('searchProduct', showProduct(products, search[1])) //showProduct checks for wordSimilarity and returns page.
})

app.get("/search/Recipe",checkAuthenticated, async (req, res) => {
    //1. format the search method
    search = searchRecipe(req.query)
    
    //2. format the query for MongoDB request
    var query = {}
    //If category is selected, add a category filter.
    if(search[0]){
        query = {category:search[0]}
    }
    //2. Search in database with the category filter
    var recipes = await db_searchRecipe(query)
    //3. Show the page
    res.render('searchRecipe', showRecipe(recipes, search[1]))//showRecipe checks for wordSimilarity and returns page.
})

//Show a specific recipe matching the recipeID.
app.get('/recipeDetail/:recipeID', checkAuthenticated,async function(req, res) {
    //1. Search in database
    const recipe = await db_searchRecipe({_id:req.params.recipeID})
    //2. Show
    res.render('recipeDetail', showDetailRecipe(recipe))
}); 

//Show the privacy document
app.get("/privacy", function (req, res) {
    res.render('privacy_policy');
})

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application. at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook', passport.authenticate('facebook', {scope:['email']})); //if you'd like to use facebook email decomment this line

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

//to Log Out
app.delete('/logout',function(req,res){
    req.logOut()
    res.redirect('/login')
})


//APP.POST

//Allows the user to sign In
app.post('/loginPOST',passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash: true   
}))

//Allows the user to register on the website
app.post("/registerPOST", async function(req,res){
    res.redirect("/login")
    //1. Encrypt password and add necessary database information.
    const registerRep = await register(req.body)
    //2. Add user to the databse
    db_registerUser(registerRep)
})

//Add product to the databse
app.post("/addProduct",checkAuthenticated, function (req, res) {
    res.redirect("/search/Product")
    //1. Add necessary information to the product
    product = addProduct(req.body)
    //2. Add product to the database
    db_addProduct(product)
})

//Add recipe to the database
app.post("/addRecipe",checkAuthenticated, (req, res) => {
    res.redirect("/search/Recipe")
    //1. Add necessary information to the recipe
    recipe = addRecipe(req.body, req.session.passport.user ) 
    //2. Add recipe to the database
    db_addRecipe(recipe)
})



//Function to check if user is authenticated
function checkAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
    }
    

//Function to check if user is not authenticated
    //A user doesn't have to register or login if authenticated
function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

//The port for the server
app.listen(8000)

console.log("Connect to CookBook on http://localhost:8000")