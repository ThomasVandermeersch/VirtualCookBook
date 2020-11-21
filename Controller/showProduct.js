const distinctValues = require('./distinctValues')
const wordSimilarity = require('./wordSimilarity')

//This function compute all necesarry information in order to show a product.
module.exports = function showProduct(products,search){
    if(search){
        products = wordSimilarity(products,search,"name", 0.6)
    }
    const categories = distinctValues(products,"category")

    return { categories : categories, products: products }          
}