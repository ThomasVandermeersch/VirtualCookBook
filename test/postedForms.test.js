const assert = require('assert');

const date = Date()
const object = {name: "Pomme",calories: 123}
const objectResp = {name: "Pomme",calories: 123, created: date, updated: date}

const addProduct = require('../Controller/addProduct')
const addProductResult = addProduct(object)

const addRecipe = require('../Controller/addRecipe')
const addRecipeResult = addRecipe(object)


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



describe('Recipe insertion', () => {
    it('should return same Recipe names', () => {
        assert.equal(addRecipeResult.name,objectResp.name);
       });
    it('should return same Recipe calories',() =>{
        assert.equal(addRecipeResult.calories,objectResp.calories);
    });

    it('should verify that updated is added and is of type date',(done)=>{
        if('updated' in addRecipeResult){
            if( typeof(addRecipeResult.updated) === typeof(Date())){
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
        if('created' in addRecipeResult){
            if( typeof(addRecipeResult.created) === typeof(Date())){
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