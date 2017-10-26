"use strict";

/* globals  */

var requester = window.requester;

(function (scope) {

    scope.articlesDate = {
        getArticles: function getArticles(pageNumber, pageSize, pattern) {
            return requester.getJSON(window.path + ("/api/articles/getall?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&pattern=" + pattern));
        },
        getArticleById: function getArticleById(id) {
            return requester.getJSON(window.path + ("/api/articles/getbyid?id=" + id));
        },
        addBook: function addBook(article) {
            return requester.postJSON(window.path + "/api/articles/create", article);
        },
        addComment: function addComment(comment) {
            return requester.putJSON(window.path + "/api/articles/addcomment", comment);
        }
    };
})(window);