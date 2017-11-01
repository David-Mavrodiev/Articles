'use strict';

const User = require('../models/User'),
    Article = require('../models/Article'),
    mongoose = require('mongoose'),
    hashing = require('../utils/hashing');

// the next 3 lines are mongoose configuration and should be extracted in a config file
const CONNECTION_URL = 'mongodb://localhost:27017/article-store';

mongoose.connect(CONNECTION_URL);
mongoose.Promise = global.Promise;

module.exports = {
    getAllUsers() {
        return new Promise((resolve, reject) => {
            User.find((err, users) => {
                if (err) {
                    return reject(err);
                }

                return resolve(users);
            });
        });
    },
    findById(userId) {
        return new Promise((resolve, reject) => {
            User.findById(userId, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });

    },
    findByUsername(username) {
        return new Promise((resolve, reject) => {
            User.findOne({ username }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    },
    createUser(user) {

        // hash the password so it isn't stored in plain text
        const salt = hashing.generateSalt(),
            passHash = hashing.hashPassword(salt, user.password);

        const newUser = {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            imageUrl: user.imageUrl,
            email: user.email,
            roles: user.roles,
            salt,
            passHash
        };

        return new Promise((resolve, reject) => {
            User.create(newUser, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    },
    createArticle(article, owner) {
        var currentTime = new Date()
        var month = currentTime.getMonth();
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();

        const newArticle = {
            title: article.title,
            description: article.description,
            category: article.category,
            image: article.image,
            creationDate: month + "-" + day + "-" + year
        };

        if (owner) {
            newArticle.owner = {
                username: owner.username,
                userImageUrl: owner.imageUrl,
                userRoles: owner.roles
            }
        }

        return new Promise((resolve, reject) => {
            Article.create(newArticle, (err, article) => {
                if (err) {
                    return reject(err);
                }

                return resolve(article);
            });
        });
    },

    getAllArticles() {
        return new Promise((resolve, reject) => {
            Article.find({}).sort("title").exec((err, articles) => {
                if (err) {
                    return reject(err);
                }

                return resolve(articles);
            });
        });
    },
    getAllArticlesCount() {
        return new Promise((resolve, reject) => {
            Article.find({}).sort("title").exec((err, articles) => {
                if (err) {
                    return reject(err);
                }

                return resolve(articles.length);
            });
        });
    },
    getPagedArticles(pageNumber, pageSize, pattern) {
       
        return new Promise((resolve, reject) => {
            Article.find({})
            .where({
                title: new RegExp(pattern, "i")
            })
            .sort(
                "title"
            ).skip(pageNumber * pageSize).limit(pageSize).exec((err, articles) => {
                if (err) {
                    return reject(err);
                }

                return resolve(articles);
            });
        });
    },
    getArticlesByCategory(category){
         return new Promise((resolve, reject) => {
            Article.find({})
            .where({
                category: new RegExp(category, "i")
            })
            .sort(
                "title"
            ).exec((err, articles) => {
                if (err) {
                    return reject(err);
                }

                return resolve(articles);
            });
        });
    },
    articleById(articleId) {
        return new Promise((resolve, reject) => {
            Article.findById(articleId, (err, article) => {
                if (err) {
                    return reject(err);
                }

                return resolve(article);
            });
        });
    },
    updateArticleById(articleId, updateOptions) {
        return new Promise((resolve, reject) => {
            Article.findByIdAndUpdate(articleId, updateOptions, (err, article) => {
                if (err) {
                    return reject(err);
                }
                return resolve(article);
            });
        })
    },
    removeArticleById(articleId) {
        return new Promise((resolve, reject) => {
            Article.find({ '_id': articleId }).remove().exec();
            resolve();
        });
    },
    createCommentForArticle(articleId, comment, author) {

        const newComment = {
            content: comment.content
        };

        if (author) {
            newComment.author = {
                username: author.username
            };
        }

        return Article.findByIdAndUpdate(articleId, {
            $push: { comments: newComment }
        });
    }
};