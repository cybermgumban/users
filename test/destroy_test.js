const assert = require("assert");
const User = require("../src/user");

describe('Deleting users', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: "Joe" });
        joe.save()
            .then(() => done());
    });

    it('delete model instance', (done) => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('delete class model', (done) => {
        User.remove()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('find class model and remove', (done) => {
        User.findOneAndRemove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('find class model by Id and remove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ _id: joe._id }))
            .then((id) => {
                assert(id === null);
                done();
            });
    });
});