const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

//Converts DB information to match mongoDB and adds it to the DB
module.exports = function addRecipe(recipe){    
    
    const recipeModel = new Recipe(recipe);
    recipeModel.save()
      .then(() => { console.log('Succesfuly inserted'); })
      .catch((err) => {
        console.log(err);
      });
  } 