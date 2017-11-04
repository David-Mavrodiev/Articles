/* globals $ alertify*/
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

window.controllers = window.controllers || {};
var templates = window.templates;
var articlesData = window.articlesdata;

(function (scope) {
    var articleById = function articleById(params) {
        var id = params.id;
        var article;
        var promises = [];
        Promise.all([articlesData.getArticleById(id), articlesData.getArticles(0, 5, ""), templates.get("detail-article"), templates.get("right-bar")]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 4),
                article = _ref2[0],
                articles = _ref2[1],
                articleTemplate = _ref2[2],
                rightBarTemplate = _ref2[3];

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

                $('.articles-container').html('');
                $('.pagination-container').html('');
                $('.detail-article-container').html(html);
                templateHelper.addCreateCommentListener(id);

                $accountContainer.html('');
                var loginLink = common.createNavLinkToggle("Login", "#login-modal");
                var registerLink = common.createNavLinkToggle("Register", "#register-modal");
                $accountContainer.append(loginLink, registerLink);

                templateHelper.addLogin();
                templateHelper.addRegister();
            });

            var html = rightBarTemplate({ articles: articles }, {
                data: { intl: intlData }
            });

            $('.right-bar-articles-container').html(html);
        });
    };

    scope.article = {
        articleById: articleById
    };
})(window.controllers);