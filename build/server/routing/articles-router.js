'use strict';

const router = require('express').Router(),
    createArticlesController = require('../controller/articles-controller'),
    data = require('../data'),
    auth = require('../middlewares/auth-middleware'),
    dataMiddleware = require('../middlewares/data-middlewares');

const articlesController = createArticlesController(data);

module.exports = app => {
    router
        .get('/api/articles', articlesController.getArticles)
        .post('/api/articles', auth.isAuthenticated, articlesController.createArticle)
        .get('/api/articles/:articleId', dataMiddleware.articleById, articlesController.articleById)
        .put('/api/articles/:articleId', auth.isInRole('admin'), articlesController.updateArticle)
        .delete('/api/articles/:articleId', auth.isInRole('admin'), articlesController.removeArticle)
        .put('/api/articles/:articleId/comments', auth.isAuthenticated, dataMiddleware.articleById, articlesController.createComment)


    app.use(router);
}