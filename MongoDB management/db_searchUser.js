
const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = function db_searchUser(query){
    console.log("Yes I'm called")
    console.log(query)
    return User.findOne(query,{}).exec()
        .catch(() => { return "Something went wrong"})
}