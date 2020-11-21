const distinctValues = require('./distinctValues')
const wordSimilarity = require('./wordSimilarity')
module.exports = function showProduct(products,search){
    if(search){
        products = wordSimilarity(products,search,"name", 0.6)
    }
    console.log(products)
    const categories = distinctValues(products,"category")
    console.log(categories)


    return { categories : categories, products: products }          
}