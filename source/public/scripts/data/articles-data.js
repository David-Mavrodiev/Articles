/* globals  */

const requester = window.requester;

((scope) => {

    scope.articlesDate = {
        getArticles(pageNumber, pageSize, pattern) {
            return requester.getJSON(window.path + `/api/articles/getall?pageNumber=${pageNumber}&pageSize=${pageSize}&pattern=${pattern}`);
        },
        getArticleById(id) {
            return requester.getJSON(window.path + `/api/articles/getbyid?id=${id}`);
        },
        addBook(article) {
            return requester.postJSON(window.path + `/api/articles/create`, article);
        },
        addComment(comment) {
            return requester.putJSON(window.path + `/api/articles/addcomment`, comment);
        },
    }

})(window)