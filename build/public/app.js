"use strict";

/* globals $ Navigo controllers */

$(function () {

    var root = null;
    var useHash = true;
    var usersdata = window.usersdata;

    var router = new Navigo(root, useHash);

    // routing
    router.on("articles", controllers.articles.allArticles).on("articles/:id", controllers.article.articleById).on("home", controllers.home.start).on("*", controllers.home.start).resolve();

    usersdata.isLoggedIn().then(function (isLoggedIn) {
        if (isLoggedIn) {}
    });
});