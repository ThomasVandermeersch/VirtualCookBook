const assert = require('assert');

//test example (just to make sure our tests are working)
describe('Simple Math Test', () => {
 it('should return 2', () => {
        assert.equal(1 +1, 2);
    });
 it('should return 9', () => {
        assert.equal(3 * 3, 9);
    });
});