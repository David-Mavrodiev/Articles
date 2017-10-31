"use strict";

/* globals  */

var requester = window.requester;

(function (scope) {

    scope.articlesdata = {
        getArticles: function getArticles(pageNumber, pageSize, pattern) {
            return requester.getJSON("/api/articles?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&pattern=" + pattern);
        },
        getArticleById: function getArticleById(id) {
            return requester.getJSON("/api/articles/getbyid?id=" + id);
        },
        addArticle: function addArticle(article) {
            return requester.postJSON("/api/articles", article);
        },
        addComment: function addComment(comment) {
            return requester.putJSON("/api/articles/addcomment", comment);
        }
    };
})(window);