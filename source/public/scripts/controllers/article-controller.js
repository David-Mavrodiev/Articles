/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const articlesData = window.articlesdata;

((scope) => {
    const articleById = (params) => {
        var id = params.id;
        Promise.all([articlesData.getArticleById(id), templates.get("article")])
            .then(([res, template]) => {

            });
    }

    scope.article = {
        articleById
    };

})(window.controllers)