'use strict';

module.exports = function(data) {
    return {
        getArticles(req, res) {
            console.log(req.query);
            let pageNumber = +req.query.pageNumber || 0,
                pageSize = +req.query.pageSize || 6,
                pattern = req.query.pattern || '';

            if (pageNumber < 0) {
                pageNumber = 0;
            }

            if (pageSize < 0) {
                pageSize = 6;
            }

            if (pageSize > 50) {
                pageSize = 50;
            }



            data.getPagedArticles(pageNumber, pageSize, pattern)
                .then(articles => res.status(200).json(articles))
                .catch(error => {
                    console.log("TEEEEEST");
                    res.status(500).json(error);
                });
        },
        createArticle(req, res) {
            console.log(req.body);
            const owner = req.user,
                title = req.body.title,
                description = req.body.description,
                category = req.body.category,
                image = req.body.image;

            if (!title) {
                res.status(400).json({
                    success: false,
                    message: 'Article must have title!'
                });
                return;
            }
            data.createArticle({ title, description, category, image }, owner)
                .then(dbArticle => res.status(201).json({
                    success: true,
                    message: "The article is added",
                    article: dbArticle
                }))
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
        articleById(req, res) {
            res.status(200).json(req.data.article);

        },
        updateArticle(req, res) {
            const id = req.params.articleId,
                newTitle = req.body.title,
                newDescription = req.body.description,
                newCategory = req.body.category;

            data.updateArticleById(id, {
                    title: newTitle,
                    description: newDescription,
                    category: newCategory
                })
                .then(dbArticle => res.status(200).json(dbArticle))
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
        removeArticle(req, res) {
            const id = req.params.articleId;

            data.removeArticleById(id)
                .then(removedArticle => res.status(200).json(removedArticle))
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
        createComment(req, res) {
            const articleId = req.params.articleId,
                content = req.body.content,
                author = req.user;

            data.createCommentForArticle(articleId, { content }, author)
                .then(comment => res.status(201).json(comment))
                .catch(error => {
                    console.log(error);
                    res.json(error);
                });
        },
        getCommentsForArticle(req, res) {
            // capitalizing on middleware
            res.status(200).json(req.data.article.comments);
        }
    }
}