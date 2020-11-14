const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// HTTP authentication
const path = require('path');
const auth = require('http-auth');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


router.get('/', (req, res) => {
    //   res.send("<h1>It works!</h1>");
    res.render('form', { title: 'Registration form' });

    //////////////////////NEWRECIPE////////////
    // res.render('newrecipe', {title : 'New Recipe'});
    //////////////////////////////////
});

module.exports = router;


router.post('/',
    [
        check('name') //to verify 'name' is not EMPTY
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),
        check('email') //to verify 'email' is an email
            .isEmail()
            .withMessage('Please enter an email'),
    ],
    (req, res) => {


        const errors = validationResult(req);

        // if (errors.isEmpty()) {
        //     res.send('Thank you for your registration!');
        //     console.log(req.body);
        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => { res.send('Thank you for your registration!'); })
                .catch((err) => {
                    console.log(err);
                    res.send('Sorry! Something went wrong.');
                });
            console.log(req.body);
        } else {
            res.render('form', {
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

router.get('/registrations', (req, res) => {
    res.render('index', { title: 'Listing registrations' });
});

router.get('/registrations', basic.check((req, res) => { //basic.check() used to protect via password
    Registration.find()
        .then((registrations) => {
            res.render('index', { title: 'Listing registrations', registrations });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
}));




router.get('/newrecipe', (req, res) => {
    res.render('newrecipe', { title: 'New Recipe' });
});


router.post('/newrecipe',
    [
        check('recipename') //to verify 'recipename' is not EMPTY
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),
        check('time') //to verify 'time' is an int
            .isInt()
            .withMessage('Please enter an number'),
    ], (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const reciperegistration = new Reciperegistration(req.body);
            reciperegistration.save()
                .then(() => { res.send('Thank you for your reciperegistration!'); })
                .catch((err) => {
                    console.log(err);
                    res.send('Sorry! Something went wrong.');
                });
            console.log(req.body);
        } else {

            res.render('newrecipe', {
                title: 'New Recipe',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);


router.get('/reciperegistrations', (req, res) => {
    res.render('index', { title: 'Listing reciperegistrations' });
});

router.get('/reciperegistrations', basic.check((req, res) => { //basic.check() used to protect via password
    Reciperegistration.find()
        .then((reciperegistrations) => {
            res.render('index', { title: 'Listing reciperegistrations', reciperegistrations });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
}));