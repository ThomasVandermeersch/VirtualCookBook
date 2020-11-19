//This script search a product in the MongoDB database.


const mongoose = require('mongoose');
const wordSimilarity = require('../wordSimilarity.js')

//Search for Product model
const Product = mongoose.model('Product');

module.exports = function searchProduct(query, res){
    //Find a product with the given query and return it
    const search = query.search
    var Mquery = {}
    if('category' in query){
        Mquery = {category: query.category}
    }
    Product.find(Mquery,{_id:0})
    .then((products) =>{
        Product.distinct('category')
            .then((categories)=>{
                if('search' in query){
                    products = wordSimilarity(products,search,"name", 0.6)
                }
                
                res.render('searchProduct', { categories : categories, products: products })            
            })
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
}


