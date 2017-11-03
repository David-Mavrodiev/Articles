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
        Promise.all([articlesData.getArticleById(id), templates.get("detail-article")])
            .then(([res, template]) => {
                var article = res;
                var promises = [];
                
                article.comments.forEach((comment) => {
                    promises.push(
                        usersdata.getUserByUsername(comment.author.username)
                            .then((user) => {
                                comment.author.image = user.imageUrl;
                        })
                    );
                })
                
                Promise.all(promises).then(() => {
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

                    $accountContainer.html('');
                    let loginLink = common.createNavLinkToggle("Login", "#login-modal");
                    let registerLink = common.createNavLinkToggle("Register", "#register-modal");
                    $accountContainer.append(loginLink, registerLink);
                    
                    templateHelper.addLogin();
                    templateHelper.addRegister();
                });
            });
    }

    scope.article = {
        articleById
    };

})(window.controllers)