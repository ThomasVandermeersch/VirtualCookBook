const stringSimilarity = require('string-similarity')

// var similarity = stringSimilarity.compareTwoStrings('tomate ', 'TomatE'); 
 
// var matches = stringSimilarity.findBestMatch('healed', ['edward', 'sealed', 'theatre']);

// console.log(matches)

//This function recieves a MongoDB object in Input
//The function returns all elements that are similar to the searched word
//The word level can be congigured

module.exports = function wordSimilarity(mongoObject,word,field,level){
    //This array will contain the words of the mongoObject with key corresponding to the field parametre
    var ratingArray = []
    
    for (var i = 0; i < mongoObject.length; i++) {
        var score = stringSimilarity.compareTwoStrings(mongoObject[i][field],word)
        var objectAndScore = {score:score,object:mongoObject[i]}
        
        ratingArray.push(objectAndScore)
    }
    
    ratingArray.sort((a, b) => {
        return b.score - a.score;
    });
    
    var result = []
    for (var j = 0; j < ratingArray.length; j++) {
        if(ratingArray[j].score >= level){
            result.push(ratingArray[j].object)
        }
    }        
    return result
}

// a = wordSimilarity([
//             {name:1,id:"Bonjour les amis"},
//             {name:2,id:"Bonjour ami"},
//             {name:4,id:"Bonjour le ami"},
//                                 ],"Bonjour le ami","id",0.6)

// console.log(a)