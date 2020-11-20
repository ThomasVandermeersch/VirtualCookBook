const { response } = require('express')
const distinctValues = require('../Controller/distinctValues')


object1 = {name:'Pierre',age:55}
object2 = {name:'Jean',age:36}
object3 = {name:'Pierre',age:36}

array = [object1,object2,object3]

describe('Simple Math Test', () => {
    it('should return two same list', (done) => {
        var response = distinctValues(array,"age")
        if(response.equals([55,36])){
               done()
        }
        else if(response.equals([36,55])){
            done()
        }
        else{
            done("List are different")
        }
    });
    
    it('should return two same list', () => {
        var response = distinctValues(array,"name")
        if(response.equals(['Pierre','Jean'])){
               done()
        }
        else if(response.equals(['Jean','Pierre'])){
            done()
        }
        else{
            done("List are different")
        }
    })
})
