const mongoose = require("mongoose");
const { convert } = require('html-to-text');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }],
    content: { type: String, default: null },
    image: { type: String, default: null },
    description: { type: String, default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: Boolean, default: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
})

PostSchema.set('timestamps', true)

PostSchema.post('findOne', function (post) {
    if (post && !post.description) {
        let text = convert(post.content, {
            wordwrap: false,
            ignoreHref: true,
            ignoreImage: true
        });
        let words = text.split(' ')
        words = words.splice(0, 30)
        post.description = words.join(' ')
    }
    return post
})

PostSchema.post('find', function (posts) {
    posts.forEach(post => {
        let text = convert(post.content, {
            wordwrap: false,
            ignoreHref: true
        });
        let words = text.split(' ')
        words = words.splice(0, 27)
        post.description = words.join(' ')
        post.content = ''
    })
    return posts
})

const Post = mongoose.model(
    "post",
    PostSchema
);

Post.schema.virtual('url').get(function() {
    return '/posts/' + this._id
})

module.exports = Post;