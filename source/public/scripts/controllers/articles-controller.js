/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const articlesData = window.articlesdata;

((scope) => {

    const allArticles = () => {
        Promise.all([articlesData.getArticles(0, 10, ""), templates.get("articles")])
            .then(([res, template]) => {
                const articles = res;
                var intlData = {
                    "locales": "en-US"
                };
                
                let html = template({ books }, {
                    data: { intl: intlData }
                });

                $("#articles-placeholder").html(html);
            });
    }

    scope.articles = {
        allArticles
    };

})(window.controllers)