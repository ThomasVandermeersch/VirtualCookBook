//This script search a product in the MongoDB database.


//const wordSimilarity = require('../wordSimilarity.js')

// //Search for Product model
// const Product = mongoose.model('Product');

//No additional features resolve for the moment
//The first element of the array requires important information for the 
//database, the second for the function.

module.exports = function searchRecipe(query){
    if('search' in query && 'category' in query){
        return [query.category, query.search]
    }
    else if('search' in query){
        return [undefined, query.search]
    }
    else if('category' in query){
        return [query.category,undefined]
    }
    else{
        return [undefined,undefined]
    }
} 
    /*Product.find(Mquery,{_id:0})
    .then((products) =>{
        Product.distinct('category')
            .then((categories)=>{
                if('search' in query){
                    products = wordSimilarity(products,search,"name", 0.6)
                }
                
                res.render('searchProduct', { categories : categories, products: products })            
            })
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });*/


