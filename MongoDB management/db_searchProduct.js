
const mongoose = require('mongoose');
const Product = mongoose.model('Product');


module.exports = function db_searchProduct(category){
    var query = {}
    //console.log("searchProduct is called")
    if(category){
        query = {category:category}
    }
    return Product.find(query,{_id:0}).exec()
        .catch(() => { return "Something went wrong"})
}