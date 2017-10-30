/* globals $ alertify*/
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

window.controllers = window.controllers || {};

var templates = window.templates;
var articlesData = window.articlesdata;
var usersdata = window.usersdata;
var common = window.common;

(function (scope) {
    var $accountContainer = $(".account-container");
    var $loginRegisterContainer = $(".login-register-container");
    var $paginationContainer = $(".pagination-container");
    var $articlesContainer = $(".articles-container");
    var $footerContainer = $("footer");

    var start = function start() {
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

            usersdata.isLoggedIn().then(function (username) {
                if (username === null) {
                    var loginLink = common.createNavLinkToggle("Login", "#login-modal");
                    var registerLink = common.createNavLinkToggle("Register", "#register-modal");
                    $accountContainer.append(loginLink, registerLink);

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
                } else {
                    addLogoutLink();
                }
            });

            templates.get("pagination").then(function (template) {
                var intlData = {
                    "locales": "en-US"
                };

                var html = template(null, {
                    data: { intl: intlData }
                });

                $paginationContainer.append(html);
            });

            templates.get("footer").then(function (template) {
                var intlData = {
                    "locales": "en-US"
                };

                var html = template(null, {
                    data: { intl: intlData }
                });

                $footerContainer.append(html);
            });
        });
    };

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

            console.log(user);

            usersdata.register(user).then(function (resp) {
                if (resp.success) {
                    localStorage.setItem("username", resp.user.username);
                    $("#register-modal").modal("hide");
                    addLogoutLink();
                } else {
                    document.location = "#/home";
                }
            });
            ev.preventDefault();
            return false;
        });
    }

    function addLogoutLink() {
        var logoutLink = common.createNavLink("Logout", "logout");

        logoutLink.on("click", function () {
            var loginLink = common.createNavLinkToggle("Login", "#login-modal");
            var registerLink = common.createNavLinkToggle("Register", "#register-modal");
            $accountContainer.append(loginLink, registerLink);
            localStorage.removeItem("username");
            $(this).remove();
        });

        $accountContainer.html(logoutLink);
    }

    scope.home = {
        start: start
    };
})(window.controllers);