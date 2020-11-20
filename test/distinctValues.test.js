const distinctValues = require('../Controller/distinctValues')


object1 = {name:'Pierre',age:55}
object2 = {name:'Jean',age:36}
object3 = {name:'Pierre',age:36}

array = [object1,object2,object3]

describe('Disctinct value test', () => {
    it('should return two same list', (done) => {
        var response = JSON.stringify(distinctValues(array,"age"))
        if(response == JSON.stringify([55,36])){
               done()
        }
        else if(response == JSON.stringify([36,55])){
            done()
        }
        else{
            done("List are different")
        }
    });
    
    it('should return two same list', (done) => {
        response = JSON.stringify(distinctValues(array,"name"))
        if(response == JSON.stringify(['Pierre','Jean'])){
               done()
        }
        else if(response == JSON.stringify(['Jean','Pierre'])){
            done()
        }
        else{
            done("List are different")
        }
    })
})
