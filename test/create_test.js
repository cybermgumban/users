const assert = require("assert");
const User = require("../src/user");

describe('Creating records', () => {
    it('saves a user', (done) => {
        //this will test if your it statement is working before you put in any command
        //assert(1+1 === 3);

        const joe = new User({ name: "Joe" });

        joe.save()
            .then(() => {
                //Has joe been saved successfully?
                //joe.isNew === true if isn't saved yet in Mongo and still in Mocha
                assert(!joe.isNew);
                done();
            });
    });

});