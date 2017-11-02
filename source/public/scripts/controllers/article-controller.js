/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const articlesData = window.articlesdata;

((scope) => {
    const articleById = (params) => {
        var id = params.id;
        console.log("QWQWQ");
        Promise.all([articlesData.getArticleById(id), templates.get("detail-article")])
            .then(([res, template]) => {
                const article = res;
                console.log(article);
                var intlData = {
                    "locales": "en-US"
                };

                let html = template({ article }, {
                    data: { intl: intlData }
                });

                $('.articles-container').html('');
                $('.pagination-container').html('');
                $('.detail-article-container').html(html);
            });
    }

    scope.article = {
        articleById
    };

})(window.controllers)