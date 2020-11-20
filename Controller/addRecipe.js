
module.exports = function addRecipe(recipe){        
    
    const date = Date()
    recipe["created"] = date
    recipe["updated"] = date
    recipe["validated"] = false

    return recipe
  } 