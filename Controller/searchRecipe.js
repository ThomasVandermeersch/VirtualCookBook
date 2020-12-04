
//This function reformat the search of a Recipe in order to show the recipe and find Recipes in any DB.
module.exports = function searchRecipe(query){
    if('search' in query && 'category' in query){
        return [query.category, query.search]
    }
    else if('search' in query){
        return [undefined, query.search]
    }
    else if('category' in query){
        return [query.category,undefined]
    }
    else{
        return [undefined,undefined]
    }
}