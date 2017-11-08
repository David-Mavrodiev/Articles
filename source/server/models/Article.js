'use strict';

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String
    },
    owner: {
        username: String,
        userImageUrl: String,
        userRoles: [String]
    },
    image: {
        type: String
    },
    creationDate: {
        type: Date
    },
    comments: [{
        content: {
            type: String,
            required: true,
            minlength: 5
        },
        author: {
            username: String
        },
        replies: [{
            content: {
                type: String,
                required: true,
                minlength: 5
            },
            author: {
                username: String
            }
        }]
    }]
});

mongoose.model('Article', articleSchema);

module.exports = mongoose.model('Article');