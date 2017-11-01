/* globals $ Navigo controllers */
var router;

$(() => {

    const root = null;
    const useHash = true;
    const usersdata = window.usersdata;

    router = new Navigo(root, useHash);

    // routing
    router
        .on("articles", controllers.articles.allArticles)
        .on("articles/:id", controllers.article.articleById)
        .on("home", controllers.home.start)
        .on("*", controllers.home.start)
        .resolve();

    usersdata.isLoggedIn()
        .then(function(isLoggedIn) {
            if (isLoggedIn) {

            }
        });
});