/* globals $ alertify*/
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

window.controllers = window.controllers || {};
var templates = window.templates;
var articlesData = window.articlesdata;

(function (scope) {

    var allArticles = function allArticles(params, query) {
        var queryObj = JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

        if (queryObj.category === null || queryObj.category === undefined) {
            var pageNumber = queryObj.pageNumber - 1 || 0;
            var pageSize = queryObj.pageSize || 5;
            var pattern = queryObj.pattern || '';

            Promise.all([articlesData.getArticles(pageNumber, pageSize, pattern), templates.get("articles")]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    res = _ref2[0],
                    template = _ref2[1];

                var articles = res;
                var intlData = {
                    "locales": "en-US"
                };

                var html = template({ articles: articles }, {
                    data: { intl: intlData }
                });

                $articlesContainer.html(html);
                $detailsArticleContainer.html('');
            });
        } else {
            var category = queryObj.category;
            Promise.all([articlesData.getArticlesByCategory(category), templates.get("articles")]).then(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    res = _ref4[0],
                    template = _ref4[1];

                var articles = res;
                var intlData = {
                    "locales": "en-US"
                };

                var html = template({ articles: articles }, {
                    data: { intl: intlData }
                });

                $articlesContainer.html(html);
                $detailsArticleContainer.html('');
            });
        }

        templateHelper.addPagination();
        templateHelper.addFooter();
        templateHelper.addSearchListener();
        $rightBarContainer.html('');
    };

    scope.articles = {
        allArticles: allArticles
    };
})(window.controllers);