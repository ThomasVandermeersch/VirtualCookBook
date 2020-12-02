const distinctValues = require('./distinctValues')
const wordSimilarity = require('./wordSimilarity')

//This function compute all necesarry information in order to show a recipe.
module.exports = function showProduct(recipes,search){
    if(search){
        recipes = wordSimilarity(recipes,search,"name", 0.6)
    }
    const categories = distinctValues(recipes,"category")

    return { categories : categories, recipes: recipes, title: "Recipe" }          
}