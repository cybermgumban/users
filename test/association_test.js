const mongoose = require("mongoose");

const User =  require("../src/user");
const Comment = require("../src/user");
const BlogPost = require("../src/user");

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User ({ name: 'Joe' });
        blogPost = new BlogPost ({ title: 'JS is Great', content: 'Yeah yeah' });
        comment = new Comment({ content: 'abnkkbsnplako' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });


    //it.only will run only this it, other it in other docs will not be run
    it.only('saves a relation between user and blogpost', (done) => {
        User.findOne({ name: 'Joe' })
            .then((user) => {
                console.log(user);
                done();
            });
    });
});