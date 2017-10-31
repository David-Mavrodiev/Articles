/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const articlesData = window.articlesdata;

((scope) => {

    const allArticles = (query) => {
        console.log(query);
        var pageNumber = 1;
        var pageSize = 5;

        Promise.all([articlesData.getArticles(pageNumber, pageSize, ""), templates.get("articles")])
            .then(([res, template]) => {
                const articles = res;
                var intlData = {
                    "locales": "en-US"
                };
                
                let html = template({ articles }, {
                    data: { intl: intlData }
                });

                $articlesContainer.html(html);
            });
    }

    scope.articles = {
        allArticles
    };

})(window.controllers)