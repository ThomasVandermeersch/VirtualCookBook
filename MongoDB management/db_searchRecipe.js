
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

