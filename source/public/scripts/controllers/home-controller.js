/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}

const templates = window.templates;
const articlesData = window.articlesdata;
const usersdata = window.usersdata;
const common = window.common;
const templateHelper = window.helper;

((scope) => {

    const start = () => {
        Promise.all([articlesData.getArticles(0, 5, ""), templates.get("articles")])
            .then(([res, template]) => {
                const articles = res;
                console.log(articles);
                var intlData = {
                    "locales": "en-US"
                };

                let html = template({ articles, monthNames }, {
                    data: { intl: intlData }
                });

                $articlesContainer.html(html);

                usersdata.isLoggedIn().then(username => {
                    if (username === null) {
                        $accountContainer.html('');
                        let loginLink = common.createNavLinkToggle("Login", "#login-modal");
                        let registerLink = common.createNavLinkToggle("Register", "#register-modal");
                        $accountContainer.append(loginLink, registerLink);

                        templateHelper.addLogin();
                        templateHelper.addRegister();
                    } else {
                        usersdata.getUserByUsername(username).then((resp) => {
                            if ($.inArray("admin", resp.roles)) {
                                templateHelper.addArticleCreate();
                            }
                        });

                        templateHelper.addLogoutLink();
                    }
                });

                templateHelper.addPagination();
                templateHelper.addFooter();
                templateHelper.addSearchListener();
                $('.detail-article-container').html('');
            });
    };

    scope.home = {
        start
    };

})(window.controllers);