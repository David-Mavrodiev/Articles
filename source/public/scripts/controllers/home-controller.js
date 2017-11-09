/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}

const templates = window.templates;
const articlesData = window.articlesdata;
const usersdata = window.usersdata;
const common = window.common;
const commonHelper = window.commonHelper;
const articleHelper = window.articleHelper;

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
                        $accountContainer.empty();
                        let loginLink = common.createNavLinkToggle("Login", "#login-modal");
                        let registerLink = common.createNavLinkToggle("Register", "#register-modal");
                        $accountContainer.append(loginLink, registerLink);

                        commonHelper.addLogin();
                        commonHelper.addRegister();
                    } else {
                        usersdata.getUserByUsername(username).then((resp) => {
                            if ($.inArray("admin", resp.roles)) {
                                articleHelper.addArticleCreate();
                            }
                        });

                        commonHelper.addLogoutLink();
                    }
                });

                commonHelper.addPagination();
                commonHelper.addFooter();
                commonHelper.addSearchListener();
                $detailsArticleContainer.empty();
                $rightBarContainer.empty();
            });
    };

    scope.home = {
        start
    };

})(window.controllers);