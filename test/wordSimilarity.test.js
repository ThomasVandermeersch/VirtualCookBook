const wordSimilarity = require("../Controller/wordSimilarity.js")
const assert = require('assert');

//Creating some objects
object1 = {name:"hats","price": 20}
object2 = {name:"aricots","price": 20}
object3 = {name:"haricots","price": 20}
objectArray = [object1,object2,object3]
objectArrayResponse1 = [object3,object2]

//tests word similarity function
describe('Word similarity test',()=>{
    it('should return two list of same objects ',()=>{
        assert.equal(
            JSON.stringify(wordSimilarity(objectArray,"haricots","name",0.7)),
            JSON.stringify(objectArrayResponse1)
        )
    })
});

//Creating some objects
capitalObject1 = {"name":"BoNjOuR","price":20}
capitalObject2 = {"name":"Bonjourr","price":20}
capitalObject3 = {"name":"Bonjourrre","price":20}

objectArray2 = [capitalObject1,capitalObject2,capitalObject3]
objectArrayResponse2 = [capitalObject1,capitalObject2,capitalObject3]

//Checks if capital letters are not changing the result
describe('Word similarity capital letters issue',()=>{
    it('should return two list of same objects ',()=>{
        assert.equal(
            JSON.stringify(wordSimilarity(objectArray2,"bonjour","name",0.2)),
            JSON.stringify(objectArrayResponse2)
        )
    })
})