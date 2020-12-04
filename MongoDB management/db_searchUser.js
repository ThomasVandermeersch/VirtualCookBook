
const mongoose = require('mongoose');
const User = mongoose.model('User');

//Converts DB information to match mongoDB
module.exports = function db_searchUser(query){
    return User.findOne(query,{}).exec()
        .catch(() => { return "Something went wrong"})
}