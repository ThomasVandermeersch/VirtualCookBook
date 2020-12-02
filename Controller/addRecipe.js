
//This function completes the products information when they are added by a user.
module.exports = function addRecipe(recipe,username){        
    
    recipe["creator"] = username
    const date = Date()
    recipe["created"] = date
    recipe["updated"] = date
    recipe["validated"] = false

    return recipe
  } 