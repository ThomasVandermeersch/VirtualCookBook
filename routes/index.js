const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    //   res.send("<h1>It works!</h1>");
    res.render('form', { title: 'Registration form' });
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

        if (errors.isEmpty()) {
            res.send('Thank you for your registration!');
            console.log(req.body);
        } else {
            res.render('form', {
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
            });
            
        }

    });