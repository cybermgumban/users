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

    });
});