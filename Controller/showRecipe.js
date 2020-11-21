const distinctValues = require('./distinctValues')
const wordSimilarity = require('./wordSimilarity')
module.exports = function showProduct(recipes,search){
    if(search){
        recipes = wordSimilarity(recipes,search,"name", 0.6)
    }
    const categories = distinctValues(recipes,"category")


    return { categories : categories, recipes: recipes }          
}