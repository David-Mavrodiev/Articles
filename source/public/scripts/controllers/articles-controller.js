/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const articlesData = window.articlesdata;
const commonHelper = window.commonHelper;

((scope) => {

    const allArticles = (params, query) => {
        var queryObj = JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

        if(queryObj.category === null || queryObj.category === undefined){
            var pageNumber = queryObj.pageNumber - 1 || 0;
            var pageSize = queryObj.pageSize || 5;
            var pattern = queryObj.pattern || '';

            Promise.all([articlesData.getArticles(pageNumber, pageSize, pattern), templates.get("articles")])
                .then(([res, template]) => {
                    const articles = res;
                    var intlData = {
                        "locales": "en-US"
                    };

                    let html = template({ articles }, {
                        data: { intl: intlData }
                    });

                    $articlesContainer.html(html);
                    $detailsArticleContainer.empty();
                });
        }else{
            var category = queryObj.category;
            Promise.all([articlesData.getArticlesByCategory(category), templates.get("articles")])
                .then(([res, template]) => {
                    const articles = res;
                    var intlData = {
                        "locales": "en-US"
                    };

                    let html = template({ articles }, {
                        data: { intl: intlData }
                    });

                    $articlesContainer.html(html);
                    $detailsArticleContainer.empty();
                });
        }

        commonHelper.addPagination();
        commonHelper.addFooter();
        commonHelper.addSearchListener();
        $rightBarContainer.empty();
    }

    scope.articles = {
        allArticles
    };

})(window.controllers)