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
require('./models/users');

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
var facebookStrategy = require('passport-facebook').Strategy
const session = require('express-session')
const userSchema = mongoose.model('users')

var configAuth = require('./auth');

// used to serialize the user
passport.serializeUser(function (user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    return done(null, user)
});


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

                    var newUser = {};

                    newUser["facebook.id"] = profile.id;
                    newUser["facebook.token"] = accessToken;
                    newUser["facebook.name"] = profile.name.givenName + ' ' + profile.name.familyName;
                    // newUser["facebook.email"] = profile.emails[0].value;

                    const newUser2 = new userSchema(newUser);

                    newUser2.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser2)

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
app.use(passport.initialize());
app.use(passport.session());
// app.use(session(process.env.FACEBOOKKEY))

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    // cookie:{_expires : 5*60*1000 }, // time im ms before timeout
    }));
    


//_________________



app.get("/", checkAuthenticated, function (req, res) {
    res.render('form', { title: 'Registration form' });
})

app.get("/add/Recipe", function (req, res) {
    res.render('newrecipe', { title: 'Add Recipe' })
})

app.get("/add/Product",checkAuthenticated, function (req, res) {
    res.render('newproduct', { title: 'Add Product' })
})

app.get("/search/Product", checkAuthenticated,async (req, res) => {
    searchProduct(req.query, res)
})

app.get("/search/Recipe",checkAuthenticated, async (req, res) => {
    searchRecipe(req.query, res)
})

app.post("/addProduct", checkAuthenticated,function (req, res) {
    res.redirect("/search/Product")
    addProduct(req.body)
})

app.post("/addRecipe", checkAuthenticated,(req, res) => {
    res.redirect("/search/Recipe")
    addRecipe(req.body)
})

app.get("/home", function (req, res) {
    res.render('home', { title: 'CookBook - Home' });
})

app.get("/register", function (req, res) {
    res.render('register', { title: 'Registration' });
})

app.get("/privacy", function (req, res) {
    res.render('privacy_policy');
})



// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook', passport.authenticate('facebook', {scope:['email']}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/login'
    }));



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/register")
}



function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}








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




