/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}

const templates = window.templates;
const articlesData = window.articlesdata;
const usersdata = window.usersdata;
const common = window.common;
const templateHelper = window.helper;

var $accountContainer = $(".account-container");
var $loginRegisterContainer = $(".login-register-container");
var $paginationContainer = $(".pagination-container");
var $articlesContainer = $(".articles-container");
var $footerContainer = $("footer");

((scope) => {

    const start = () => {
        Promise.all([articlesData.getArticles(0, 10, ""), templates.get("home")])
            .then(([res, template]) => {
                const articles = res;
                console.log(articles);
                var intlData = {
                    "locales": "en-US"
                };

                let html = template({ articles }, {
                    data: { intl: intlData }
                });

                $articlesContainer.html(html);

                usersdata.isLoggedIn().then(username => {
                    if (username === null) {
                        let loginLink = common.createNavLinkToggle("Login", "#login-modal");
                        let registerLink = common.createNavLinkToggle("Register", "#register-modal");
                        $accountContainer.append(loginLink, registerLink);

                        templateHelper.addLogin($loginRegisterContainer, $accountContainer);
                        templateHelper.addRegister($loginRegisterContainer, $accountContainer);
                    } else {
                        usersdata.getUserByUsername(username).then((resp) => {
                            console.log(resp);
                            if ($.inArray("admin", resp.roles)) {
                                templateHelper.addArticleCreate($accountContainer);
                            }
                        });

                        templateHelper.addLogoutLink($accountContainer);
                    }
                });

                templateHelper.addPagination($paginationContainer);
                templateHelper.addFooter($footerContainer);
            });
    };

    scope.home = {
        start
    };

})(window.controllers);