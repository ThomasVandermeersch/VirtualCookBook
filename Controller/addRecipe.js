
//This function completes the products information when they are added by a user.
module.exports = function addRecipe(recipe){        
    
    const date = Date()
    recipe["created"] = date
    recipe["updated"] = date
    recipe["validated"] = false

    return recipe
  } 