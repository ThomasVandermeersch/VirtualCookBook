//This script add a recipe in the MongoDB database.


const mongoose = require('mongoose');

//Search for Recipe model
const Recipe = mongoose.model('Recipe');

//This function recieves a recipe from a POST method.
//The function add speceficities to the recipe and insert the recipe to the database.

module.exports = function addRecipe(recipe){    
    
    //Complete product informations
    recipe["created"] = Date()
    recipe["updated"] = Date()
    recipe["validated"] = false

    const recipeModel = new Recipe(recipe);
    recipeModel.save()
      .then(() => { console.log('Succesfuly inserted'); })
      .catch((err) => {
        console.log(err);
      });
  } 