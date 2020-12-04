
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

//Converts DB information to match mongoDB
module.exports = function db_searchRecipe(query){
    return Recipe.find(query).exec()
        .catch(() => { return "Something went wrong"})
}