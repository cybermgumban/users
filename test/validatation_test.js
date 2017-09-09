const assert = require("assert");
const User = require("../src/user");

describe('Validating Records', () => {
    it('requires a username', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        /*ValidateSync is synchronuous, while valiate will not result a validatio result, but can pass a function
            also to run async. sample usage is for example has same last name as other else has been saved

        user.validate((validationResult) => {

        });
        */
        const {message} = validationResult.errors.name;
        assert(message === 'Name is required.')
    });

    it('requires a user name longer than2  characters', () => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User ({ name: 'Al' });
        user.save()
            .catch((validationResult) => {
                const {message} = validationResult.errors.name;

                assert(message === 'Name must be longer than 2 characters.');
                done();
            });
    });
});