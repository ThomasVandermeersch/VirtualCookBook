const assert = require('assert');

//Créating some objects
const date = Date()
const object = {name: "Pomme",calories: 123}
const objectResp = {name: "Pomme",calories: 123, created: date, updated: date}

const addProduct = require('../Controller/addProduct')
const addProductResult = addProduct(object)

const addRecipe = require('../Controller/addRecipe')
const addRecipeResult = addRecipe(object, "Jean-Guillaume")

//tests if a product is well transformed for later DB upload
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
                done("Updated isn't of type Date")
            }
        }
        else{
            done("Updated isn't added")
        }
    })

    it('should verify that created is added and is of type date',(done)=>{
        if('created' in addProductResult){
            if( typeof(addProductResult.created) === typeof(Date())){
                done()
            }
            else{
                done("Created isn't of type Date")
            }
        }
        else{
            done("Created isn't added")
        }
    })
})


//tests if a recipe is well transformed for later DB upload
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
                done("Updated isn't of type Date")
            }
        }
        else{
            done("Updated isn't added")
        }
    })

    it('should verify that created is added and is of type date',(done)=>{
        if('created' in addRecipeResult){
            if( typeof(addRecipeResult.created) === typeof(Date())){
                done()
            }
            else{
                done("Created isn't of type Date")
            }
        }
        else{
            done("Created isn't added")
        }
    })

    it('should verify that creator is added and is of type string',(done)=>{
        if('creator' in addRecipeResult){
            if( typeof(addRecipeResult.creator) === typeof("hello")){
                done()
            }
            else{
                done("Creator isn't of type string")
            }
        }
        else{
            done("Creator isn't added")
        }
    })
})