
//This function recieves an array of objects and a field name.
//The function returns all distinct values of a specific object key (this key is selected by the field parameter).
module.exports = function distinctValues(array,field){
    var responseArray = []
    for( var i=0 ; array.length > i ; i++ ){
        if(responseArray.includes(array[i][field]) == false){
            responseArray.push(array[i][field])
        }
    }
    return responseArray
}