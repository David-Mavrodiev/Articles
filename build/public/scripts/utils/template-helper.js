/* globals $ Promise */
"use strict";

var usersdata = window.usersdata;
var common = window.common;

(function (scope) {
    function addArticleCreate($accountContainer) {
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
        });
    }
    function addLogoutLink($accountContainer) {
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

    function addLoginListener($accountContainer) {
        $("#btn-login").on("click", function (ev) {
            var user = {
                username: $("#login-username").val(),
                password: $("#login-password").val()
            };

            usersdata.login(user).then(function (resp) {
                if (resp.success) {
                    localStorage.setItem("username", resp.username);
                    $("#login-modal").modal("hide");
                    addLogoutLink($accountContainer);
                    if ($.inArray("admin", resp.userrole)) {
                        addArticleCreate($accountContainer);
                    }
                } else {
                    document.location = "#/home";
                }
            });
            ev.preventDefault();
            return false;
        });
    }

    function addRegisterListener($accountContainer) {
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
                        addArticleCreate($accountContainer);
                    }
                } else {
                    document.location = "#/home";
                }
            });
            ev.preventDefault();
            return false;
        });
    }

    scope.helper = {
        addPagination: function addPagination($paginationContainer) {
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
        addFooter: function addFooter($footerContainer) {
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
        addLogin: function addLogin($loginRegisterContainer, $accountContainer) {
            templates.get("login").then(function (template) {
                var intlData = {
                    "locales": "en-US"
                };

                var html = template(null, {
                    data: { intl: intlData }
                });

                $loginRegisterContainer.append(html);
                addLoginListener($accountContainer);
            });
        },
        addRegister: function addRegister($loginRegisterContainer, $accountContainer) {
            templates.get("register").then(function (template) {
                var intlData = {
                    "locales": "en-US"
                };

                var html = template(null, {
                    data: { intl: intlData }
                });

                $loginRegisterContainer.append(html);
                addRegisterListener($accountContainer);
            });
        },

        addLogoutLink: addLogoutLink,
        addArticleCreate: addArticleCreate
    };
})(window);