const mongoose = require('mongoose')

var postScheme = mongoose.Schema({
    title: {
        type: String,
        default: "Default title"
    },
    text: {
        type: String,
        required: true,
        minlength: 1
    },
    createTime: {
        type: Date,
        required: true

    },
    updateTime: {
        type: Date
    }

})


var Post = mongoose.model('Post', postScheme)

module.exports = Post
