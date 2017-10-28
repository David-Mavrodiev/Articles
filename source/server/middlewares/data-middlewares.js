'use strict';

const data = require('../data');

module.exports = {
    articleById(req, res, next) {
        data.articleById(req.params.articleId)
            .then(article => {
                if (!article) {
                    res.status(404).json({ message: 'No article with such id!' });
                    return;
                }

                req.data = req.data || {};
                req.data.article = article;
                next();
            })
            .catch(error => res.status(500).json({ message: 'Error' }));
    },
};