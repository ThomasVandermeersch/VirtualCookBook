//Connexion to MongoDB

const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function connect(){
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
}