const stringSimilarity = require('string-similarity')

var similarity = stringSimilarity.compareTwoStrings('tomate ', 'TomatE'); 
 
var matches = stringSimilarity.findBestMatch('healed', ['edward', 'sealed', 'theatre']);

console.log(similarity)

//This function recieves a MongoDB object in Input
//The function returns all elements that are similar to the searched word
//The word level can be congigured

module.exports = function wordSimilarity(mongoObject,word,field,level){
    return true
}