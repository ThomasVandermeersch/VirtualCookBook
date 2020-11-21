const assert = require('assert');
const searchProduct = require("../Controller/searchProduct")




describe('Test  search Product', () => {
 it('should return a correct array [undefined,undefined] ', () => {
     assert.equal(
         JSON.stringify([undefined,undefined]), 
         JSON.stringify(searchProduct({}))
     )
    });

 it("should return a correct array ['meat','poisson'] ", () => {
        assert.equal(
            JSON.stringify(['meat','poisson']),
            JSON.stringify(searchProduct({category:"meat",search:"poisson"}))
        );
    });
it("should return a correct array [undefined,'poisson'] ", () => {
    assert.equal(
        JSON.stringify([undefined,'poisson']),
        JSON.stringify(searchProduct({search:"poisson"}))
        );
    });
it("should return a correct array [undefined,'poisson'] ", () => {
    assert.equal(
        JSON.stringify(['meat',undefined]),
        JSON.stringify(searchProduct({category:"meat"}))
        );
    });
});