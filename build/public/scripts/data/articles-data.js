"use strict";

/* globals  */

var requester = window.requester;

(function (scope) {

    scope.articlesdata = {
        getArticles: function getArticles(pageNumber, pageSize, pattern) {
            return requester.getJSON("/api/articles?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&pattern=" + pattern);
        },
        getArticlesByCategory: function getArticlesByCategory(category) {
            return requester.getJSON("/api/articlesByCategory/" + category);
        },
        getAllArticlesCount: function getAllArticlesCount() {
            return requester.getJSON("/api/articles-count");
        },
        getArticleById: function getArticleById(id) {
            return requester.getJSON("/api/articles/" + id);
        },
        addArticle: function addArticle(article) {
            return requester.postJSON("/api/articles", article);
        },
        addComment: function addComment(comment) {
            return requester.putJSON("/api/articles/addcomment", comment);
        }
    };
})(window);