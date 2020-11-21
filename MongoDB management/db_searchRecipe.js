
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');


module.exports = function db_searchProduct(category){
    var query = {}
    if(category){
        query = {category:category}
    }
    return Recipe.find(query,{_id:0}).exec()
        .catch(() => { return "Something went wrong"})
}