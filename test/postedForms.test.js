const addProduct = require('../Controller/addProduct')
const assert = require('assert');

const date = Date()
const object = {name: "Pomme",calories: 123}
const objectResp = {name: "Pomme",calories: 123, created: date, updated: date}

const addProductResult = addProduct(object)


describe('Product insertion', () => {
    it('should return same Product names', () => {
        assert.equal(addProductResult.name,objectResp.name);
       });
    it('should return same Product calories',() =>{
        assert.equal(addProductResult.calories,objectResp.calories);
    });

    it('should verify that updated is added and is of type date',(done)=>{
        if('updated' in addProductResult){
            if( typeof(addProductResult.updated) === typeof(Date())){
                done()
            }
            else{
                done("Updated is'nt of type Date")
            }
        }
        else{
            done("Updated is'nt added")
        }
    })

    it('should verify that created is added and is of type date',(done)=>{
        if('created' in addProductResult){
            if( typeof(addProductResult.created) === typeof(Date())){
                done()
            }
            else{
                done("Created is'nt of type Date")
            }
        }
        else{
            done("Created is'nt added")
        }
    })
})