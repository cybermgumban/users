const User = require("../src/user");
const assert = require("assert");

describe ('Reading users out of the database', () => {
    let joe;

    beforeEach((done) => {
        joe = new User ({ name: 'Joe' });
        joe.save()
            .then(() => done() );
    });

    it('finds all users with a name of Joe', (done) => {
        User.find({ name: 'Joe'})
            .then((users) => {
                //to compare the mongodb id to mongoose id, a toString is added at end because even though it has same value
                //they have "Object" at start e.g. Object["<id number>"]
                assert(users[0]._id.toString() === joe._id.toString());
                done()
            });
    });

    it('finds a user with a specific id', (done) => {
        User.findOne({ _id: joe._id })
            .then((user) => {
                assert( user.name === 'Joe' );
                done()
            });
    });
});