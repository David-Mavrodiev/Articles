/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const articlesData = window.articlesdata;

((scope) => {
    const articleById = (params) => {
        var id = params.id;
        var article;
        var promises = [];
        Promise.all([articlesData.getArticleById(id), articlesData.getArticlesByCategory("Politics"), articlesData.getArticlesByCategory("Sport"), templates.get("detail-article"), templates.get("right-bar")])
            .then(([article, politicsArticles, sportArticles, articleTemplate, rightBarTemplate]) => {
                var promises = [];
                
                article.comments.forEach((comment) => {
                    promises.push(
                        usersdata.getUserByUsername(comment.author.username)
                            .then((user) => {
                                comment.author.image = user.imageUrl;
                        })
                    );
                })
                
                var intlData = {
                    "locales": "en-US"
                };

                Promise.all(promises).then(() => {
                    let html = articleTemplate({ article }, {
                        data: { intl: intlData }
                    });
                    console.log(article);
                    $articlesContainer.html('');
                    $paginationContainer.html('');
                    $detailsArticleContainer.html(html);
                    templateHelper.addCreateCommentListener(id);
                    templateHelper.addReplyListener();
                    
                    $accountContainer.html('');
                });

                politicsArticles = politicsArticles.slice(Math.max(politicsArticles.length - 4, 1));
                sportArticles = sportArticles.slice(Math.max(sportArticles.length - 4, 1));
                
                let mixArticles = [];
                mixArticles.push(...politicsArticles.slice(Math.max(politicsArticles.length - 2, 0)));
                mixArticles.push(...sportArticles.slice(Math.max(sportArticles.length - 2, 0)));
                
                console.log(mixArticles);
                let html = rightBarTemplate({ politicsArticles, sportArticles, mixArticles }, {
                    data: { intl: intlData }
                });

                $rightBarContainer.html(html);
                templateHelper.addFooter();
                templateHelper.addSearchListener();
            });
    }

    scope.article = {
        articleById
    };

})(window.controllers)