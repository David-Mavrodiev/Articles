/* globals $ Promise */
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var usersdata = window.usersdata;
var articlesdata = window.articlesdata;
var common = window.common;

(function (scope) {
    function addArticleCreate() {
        var articleCreateLink = common.createNavLinkToggle("Create article", "#create-article-modal");

        $accountContainer.append(articleCreateLink);

        templates.get("create-article").then(function (template) {
            var intlData = {
                "locales": "en-US"
            };

            var html = template(null, {
                data: { intl: intlData }
            });

            $accountContainer.append(html);
            addCreateArticleListener();
        });
    }

    function addLogoutLink() {
        var logoutLink = common.createNavLink("Logout", "logout");

        logoutLink.on("click", function () {
            $accountContainer.html("");
            var loginLink = common.createNavLinkToggle("Login", "#login-modal");
            var registerLink = common.createNavLinkToggle("Register", "#register-modal");
            $accountContainer.append(loginLink, registerLink);
            usersdata.logout();
        });

        $accountContainer.html(logoutLink);
    }

    function addLoginListener() {
        $("#btn-login").on("click", function (ev) {
            var user = {
                username: $("#login-username").val(),
                password: $("#login-password").val()
            };

            usersdata.login(user).then(function (resp) {
                if (resp.success) {
                    localStorage.setItem("username", resp.username);
                    $("#login-modal").modal("hide");
                    addLogoutLink();
                    if ($.inArray("admin", resp.userrole)) {
                        addArticleCreate();
                    }
                } else {
                    document.location = "#/home";
                }
            });
            ev.preventDefault();
            return false;
        });
    }

    function addRegisterListener() {
        $("#btn-register").on("click", function (ev) {
            var user = {
                username: $("#register-username").val(),
                password: $("#register-password").val(),
                firstname: $("#register-firstname").val(),
                lastname: $("#register-lastname").val(),
                email: $("#register-email").val(),
                imageUrl: $("#register-image-url").val()
            };

            usersdata.register(user).then(function (resp) {
                if (resp.success) {
                    localStorage.setItem("username", resp.user.username);
                    $("#register-modal").modal("hide");
                    addLogoutLink($accountContainer);
                    if ($.inArray("admin", resp.user.roles)) {
                        addArticleCreate();
                    }
                } else {
                    document.location = "#/home";
                }
            });
            ev.preventDefault();
            return false;
        });
    }

    function addCreateArticleListener() {
        $("#btn-create-article").on("click", function () {
            var article = {
                title: $("#article-title").val(),
                description: $("#article-description").val(),
                category: $("#article-category").val()
            };

            articlesdata.addArticle(article).then(function (resp) {
                $("#create-article-modal").modal("hide");
                Promise.all([articlesData.getArticles(0, 10, ""), templates.get("home")]).then(function (_ref) {
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
                });
            });
        });
    }

    scope.helper = {
        addPagination: function addPagination() {
            templates.get("pagination").then(function (template) {
                var intlData = {
                    "locales": "en-US"
                };

                var html = template(null, {
                    data: { intl: intlData }
                });

                $paginationContainer.append(html);
            });
        },
        addFooter: function addFooter() {
            templates.get("footer").then(function (template) {
                var intlData = {
                    "locales": "en-US"
                };

                var html = template(null, {
                    data: { intl: intlData }
                });

                $footerContainer.append(html);
            });
        },
        addLogin: function addLogin() {
            templates.get("login").then(function (template) {
                var intlData = {
                    "locales": "en-US"
                };

                var html = template(null, {
                    data: { intl: intlData }
                });

                $loginRegisterContainer.append(html);
                addLoginListener();
            });
        },
        addRegister: function addRegister() {
            templates.get("register").then(function (template) {
                var intlData = {
                    "locales": "en-US"
                };

                var html = template(null, {
                    data: { intl: intlData }
                });

                $loginRegisterContainer.append(html);
                addRegisterListener();
            });
        },

        addLogoutLink: addLogoutLink,
        addArticleCreate: addArticleCreate
    };
})(window);