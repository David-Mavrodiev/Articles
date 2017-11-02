/* globals  */

const requester = window.requester;

((scope) => {

    scope.articlesdata = {
        getArticles(pageNumber, pageSize, pattern) {
            return requester.getJSON(`/api/articles?pageNumber=${pageNumber}&pageSize=${pageSize}&pattern=${pattern}`);
        },
        getArticlesByCategory(category){
            return requester.getJSON(`/api/articlesByCategory/${category}`);
        },
        getAllArticlesCount(){
            return requester.getJSON(`/api/articles-count`);
        },
        getArticleById(id) {
            return requester.getJSON(`/api/articles/${id}`);
        },
        addArticle(article) {
            return requester.postJSON(`/api/articles`, article);
        },
        addComment(comment) {
            return requester.putJSON(`/api/articles/addcomment`, comment);
        },
    }

})(window)