const stringSimilarity = require('string-similarity')


//This function recieves a list of object (mongoObject), a word, a field and a level)
//The function returns all the mongoObject with a field that is similar to the word.
//We can choose the level of similarity.
//Setting level of similiraty to 1 means that the objectfields have to be strictly identical to the mongoField
module.exports = function wordSimilarity(mongoObject,word,field,level){
    var ratingArray = []
    word = word.toLowerCase()
    
    for (var i = 0; i < mongoObject.length; i++) {
        try {        
            var score = stringSimilarity.compareTwoStrings(mongoObject[i][field].toLowerCase(),word)
            if(score >= level){
                var objectAndScore = {score:score,object:mongoObject[i]}
                ratingArray.push(objectAndScore)
            }

          } catch (error) {
            console.error(error);
          }
    }
    ratingArray.sort((a, b) => {
        return b.score - a.score;
    });
    
    var result = []
    for (var j = 0; j < ratingArray.length; j++) {
        result.push(ratingArray[j].object)
    }        
    return result
}