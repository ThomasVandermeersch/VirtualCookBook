

//This function compute all necesarry information in order to show a recipe.
module.exports = function showDetailRecipe(recipes){

    return { categories : "categories", recipe: recipes[0], title: recipes[0].name }    

}