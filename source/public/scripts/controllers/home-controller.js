/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}

const templates = window.templates;
const articlesData = window.articlesdata;
const usersdata = window.usersdata;
const common = window.common;

((scope) => {
    const start = () => {
        Promise.all([articlesData.getArticles(0, 10, ""), templates.get("home")])
            .then(([res, template]) => {
                const articles = res;
                var intlData = {
                    "locales": "en-US"
                };
                
                let html = template({ articles }, {
                    data: { intl: intlData }
                });

                $(".articles-container").html(html);

                usersdata.isLoggedIn().then(username => {
                    if(username === null){
                        let loginLink = common.createNavLink("Login");
                        let registerLink = common.createNavLink("Register");
                        $(".navbar-nav").append(loginLink, registerLink);

                        templates.get("login").then(template => {
                            var intlData = {
                                "locales": "en-US"
                            };
                            
                            let html = template({ articles }, {
                                data: { intl: intlData }
                            });

                            $(".login-register-container").html(html);         
                        });
                    }
                });
            });
    };



    scope.home = {
        start
    };

})(window.controllers);