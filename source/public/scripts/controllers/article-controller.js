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
        Promise.all([articlesData.getArticleById(id), articlesData.getArticles(0, 5, ""), templates.get("detail-article"), templates.get("right-bar")])
            .then(([article, articles, articleTemplate, rightBarTemplate]) => {
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

                    $('.articles-container').html('');
                    $('.pagination-container').html('');
                    $('.detail-article-container').html(html);
                    templateHelper.addCreateCommentListener(id);

                    $accountContainer.html('');
                    let loginLink = common.createNavLinkToggle("Login", "#login-modal");
                    let registerLink = common.createNavLinkToggle("Register", "#register-modal");
                    $accountContainer.append(loginLink, registerLink);
                    
                    templateHelper.addLogin();
                    templateHelper.addRegister();
                });

                let html = rightBarTemplate({ articles }, {
                    data: { intl: intlData }
                });

                $('.right-bar-articles-container').html(html);
            });
    }

    scope.article = {
        articleById
    };

})(window.controllers)