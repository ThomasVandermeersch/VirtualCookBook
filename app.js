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


//Creation of a server
const express = require("express")
const path = require('path');
const bodyParser = require('body-parser');

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//Facebook Auth
const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy
const session = require('express-session')

var configAuth = require('./auth');


passport.use(new facebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            userSchema.findOne({ 'facebook.id': profile.id }, function (err, user) {
                if (err)
                    return done(err);
                if (user)
                    return done(null, user);
                else {
                    var newUser = new user();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser)

                    })
                }

            });
        });
    }
));
  




//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////




app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public')); //Load files from 'public' ->CSS
app.use(bodyParser.urlencoded({ extended: true }));

// //Facebook Auth
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session(process.env.FACEBOOKKEY))


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
    searchProduct(req.query, res)
})

app.get("/search/Recipe", async (req, res) => {
    searchRecipe(req.query, res)
})

app.post("/addProduct", function (req, res) {
    res.redirect("/search/Product")
    addProduct(req.body)
})

app.post("/addRecipe", (req, res) => {
    res.redirect("/search/Recipe")
    addRecipe(req.body)
})

app.get("/home", function (req, res) {
    res.render('home', { title: 'CookBook - Home' });
})

app.get("/register", function (req, res) {
    res.render('register', { title: 'Registration' });
})




// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));




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




