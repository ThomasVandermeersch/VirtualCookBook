const { response } = require("express")

//Recieves an array of objects and returns an array
module.exports = function distinctValues(array,field){
    var responseArray = []
    for( var i=0 ; array.length > i ; i++ ){
        if(responseArray.includes(array[i][field]) == false){
            responseArray.push(array[i][field])
        }
    }
    return responseArray
}