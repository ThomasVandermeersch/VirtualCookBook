
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

//Converts DB information to match mongoDB
module.exports = function db_searchProduct(category){
    var query = {}
    if(category){
        query = {category:category}
    }
    return Product.find(query,{_id:0}).exec()
        .catch(() => { return "Something went wrong"})
}