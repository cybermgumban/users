const User = require("../src/user");
const assert = require("assert");

describe ('Reading users out of the database', () => {
    let joe, maria, alex, zach;

    beforeEach((done) => {
        alex = new User ({ name: 'Alex' });
        joe = new User ({ name: 'Joe' });
        maria = new User ({ name: 'Maria' });
        zach = new User ({ name: 'Zach' });

        Promise.all([ alex.save(), joe.save(), maria.save(), zach.save() ])
            .then(() => done());
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
                done();
            });
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
        //if 1 ascending, -1 descending
            .sort({ name: 1 })
            .skip(2)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'Maria');
                assert(users[1].name === 'Zach');
                done();
            })
    });
});