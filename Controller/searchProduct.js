//This script search a product in the MongoDB database.


const mongoose = require('mongoose');

//Search for Product model
const Product = mongoose.model('Product');

module.exports = function searchProduct(query, res){
    //Find a product with the given query and return it
    Product.find(query,{_id:0})
    .then((products) =>{
        res.end(JSON.stringify(products))
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
}


