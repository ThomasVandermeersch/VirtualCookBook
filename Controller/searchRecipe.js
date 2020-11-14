//This script search a product in the MongoDB database.


const mongoose = require('mongoose');

//Search for Product model
const Recipe = mongoose.model('Recipe');

module.exports = function searchRecipe(query, res){
    //Find a product with the given query and return it
    Recipe.find(query,{_id:0})
    .then((recipes) =>{
        res.end(JSON.stringify(recipes))
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
}


