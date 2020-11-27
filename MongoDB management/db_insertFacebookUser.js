
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function db_registerUser(user) {
    
    const userModel = new User(user);
    userModel.save()
      .then(() => { console.log('Succesfuly inserted'); })
      .catch((err) => {
        console.log(err);
      });
}