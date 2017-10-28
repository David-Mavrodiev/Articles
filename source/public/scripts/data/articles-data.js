/* globals  */

const requester = window.requester;

((scope) => {

    scope.articlesdata = {
        getArticles(pageNumber, pageSize, pattern) {
            return requester.getJSON(`/api/articles?pageNumber=${pageNumber}&pageSize=${pageSize}&pattern=${pattern}`);
        },
        getArticleById(id) {
            return requester.getJSON(`/api/articles/getbyid?id=${id}`);
        },
        addArticle(article) {
            return requester.postJSON(`/api/articles/create`, article);
        },
        addComment(comment) {
            return requester.putJSON(`/api/articles/addcomment`, comment);
        },
    }

})(window)