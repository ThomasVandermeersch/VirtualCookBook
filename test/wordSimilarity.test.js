const wordSimilarity = require("../wordSimilarity.js")
const assert = require('assert');


object1 = {name:"Hats","price": 20}
object2 = {name:"aricots","price": 20}
object3 = {name:"Haricots","price": 20}
objectArray = [object1,object2,object3]
objectArrayResponse1 = [object2,object3]


describe('Word similarity test',()=>{
    it('should return ',()=>{
        assert.equal(
            JSON.stringify(wordSimilarity(objectArray,"haricots","name",0.7)),
            JSON.stringify(objectArrayResponse1)
        )
    })
});