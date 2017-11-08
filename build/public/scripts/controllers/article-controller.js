/* globals $ alertify*/
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.controllers = window.controllers || {};
var templates = window.templates;
var articlesData = window.articlesdata;

(function (scope) {
    var articleById = function articleById(params) {
        var id = params.id;
        var article;
        var promises = [];
        Promise.all([articlesData.getArticleById(id), articlesData.getArticlesByCategory("Politics"), articlesData.getArticlesByCategory("Sport"), templates.get("detail-article"), templates.get("right-bar")]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 5),
                article = _ref2[0],
                politicsArticles = _ref2[1],
                sportArticles = _ref2[2],
                articleTemplate = _ref2[3],
                rightBarTemplate = _ref2[4];

            var promises = [];

            article.comments.forEach(function (comment) {
                promises.push(usersdata.getUserByUsername(comment.author.username).then(function (user) {
                    comment.author.image = user.imageUrl;
                }));
            });

            var intlData = {
                "locales": "en-US"
            };

            Promise.all(promises).then(function () {
                var html = articleTemplate({ article: article }, {
                    data: { intl: intlData }
                });
                console.log(article);
                $articlesContainer.html('');
                $paginationContainer.html('');
                $detailsArticleContainer.html(html);
                templateHelper.addCreateCommentListener(id);
                templateHelper.addReplyListener();

                $accountContainer.html('');
            });

            politicsArticles = politicsArticles.slice(Math.max(politicsArticles.length - 4, 1));
            sportArticles = sportArticles.slice(Math.max(sportArticles.length - 4, 1));

            var mixArticles = [];
            mixArticles.push.apply(mixArticles, _toConsumableArray(politicsArticles.slice(Math.max(politicsArticles.length - 2, 0))));
            mixArticles.push.apply(mixArticles, _toConsumableArray(sportArticles.slice(Math.max(sportArticles.length - 2, 0))));

            console.log(mixArticles);
            var html = rightBarTemplate({ politicsArticles: politicsArticles, sportArticles: sportArticles, mixArticles: mixArticles }, {
                data: { intl: intlData }
            });

            $rightBarContainer.html(html);
            templateHelper.addFooter();
            templateHelper.addSearchListener();
        });
    };

    scope.article = {
        articleById: articleById
    };
})(window.controllers);