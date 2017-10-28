/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}

const templates = window.templates;
const articlesData = window.articlesdata;
const usersdata = window.usersdata;

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

                $("#articles-placeholder").html(html);
            });
    };

    scope.home = {
        start
    };

})(window.controllers);