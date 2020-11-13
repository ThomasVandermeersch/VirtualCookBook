const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
//   res.send("<h1>It works!</h1>");
    res.render('form', { title: 'Registration form' });
});

module.exports = router;
