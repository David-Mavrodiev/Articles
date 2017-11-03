/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const articlesData = window.articlesdata;

((scope) => {
    const articleById = (params) => {
        var id = params.id;

        Promise.all([articlesData.getArticleById(id), templates.get("detail-article")])
            .then(([res, template]) => {
                var article = res;

                //console.log(article.comments);
                for(var i = 0; i < article.comments.length; i++){
                    var comment = article.comments[i];
                    usersdata.getUserByUsername(article.comments[i].author.username)
                        .then((user) => {
                            //console.log(comment);
                            comment.author.image = user.imageUrl;
                        });
                    article.comments[i] = comment;
                }
                console.log(article);
                var intlData = {
                    "locales": "en-US"
                };

                let html = template({ article }, {
                    data: { intl: intlData }
                });

                $('.articles-container').html('');
                $('.pagination-container').html('');
                $('.detail-article-container').html(html);
                templateHelper.addCreateCommentListener(id);
            });
    }

    scope.article = {
        articleById
    };

})(window.controllers)