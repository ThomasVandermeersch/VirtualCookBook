
//This function reformat the search of a Product in order to show the product and find Products in any DB. 
module.exports = function searchProduct(query){
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