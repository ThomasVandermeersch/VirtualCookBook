const assert = require('assert');
const register = require('../Controller/register')
const bcrypt = require('bcrypt')


describe('Test registration', () => {
 it('should return two same hash', async () => {
        const registerResponse = await register({email:'thomas@test.be',password: "1234"})
        const hash = await bcrypt.hash("1234",10)
        var comparison = await bcrypt.compare("1234",registerResponse.password)
        assert.equal(
            comparison,
            true
        );
    });

    it('should return two same email', async () => {
        const registerResponse = await register({email:'thomas@test.be',password: "1234"})
        assert.equal(
            'thomas@test.be',
            registerResponse.email
            );
    });
});