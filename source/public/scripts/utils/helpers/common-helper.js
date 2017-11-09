const usersdata = window.usersdata;
const articlesdata = window.articlesdata;
const common = window.common;

((scope) => {
    function addLogoutLink() {
        let logoutLink = common.createNavLink("Logout", "logout");

        logoutLink.on("click", function() {
            $accountContainer.html("");
            let loginLink = common.createNavLinkToggle("Login", "#login-modal");
            let registerLink = common.createNavLinkToggle("Register", "#register-modal");
            $accountContainer.append(loginLink, registerLink);
            usersdata.logout();
            location.reload();
        });

        $accountContainer.html(logoutLink);
    }

    function addLoginListener() {
        $("#btn-login").on("click", (ev) => {
            let user = {
                username: $("#login-username").val(),
                password: $("#login-password").val()
            };

            usersdata.login(user)
                .then((resp) => {
                    if (resp.success) {
                        localStorage.setItem("username", resp.username);
                        $("#login-modal").modal("hide");
                        addLogoutLink();
                        if ($.inArray("admin", resp.userrole)) {
                            window.articleHelper.addArticleCreate();
                        }
                    } else {
                        let $msg = $("<p>");
                        $msg.css("color", "red");
                        $msg.text("Wrong email or password");
                        $("#login-modal .modal-body .alert-message").html($msg);
                    }
                });
            ev.preventDefault();
            return false;
        });
    }

    function addSearchListener() {
        $('#search-box').on('keydown', function(e) {
            if (e.which == 13) {
                router.navigate('/articles/?pageNumber=1&pageSize=5&pattern=' + $(this).val());
            }
        });
    }

    function addRegisterListener() {
        $("#btn-register").on("click", (ev) => {
            let user = {
                username: $("#register-username").val(),
                password: $("#register-password").val(),
                firstname: $("#register-firstname").val(),
                lastname: $("#register-lastname").val(),
                email: $("#register-email").val(),
                imageUrl: $("#register-image-url").val()
            };

            usersdata.register(user)
                .then((resp) => {
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

    scope.commonHelper = {
        addPagination() {
            articlesdata.getAllArticlesCount()
                .then(count => {
                    templates.get("pagination").then(template => {
                        var intlData = {
                            "locales": "en-US"
                        };

                        count = count / 5;
                        let html = template({ count }, {
                            data: { intl: intlData }
                        });

                        $paginationContainer.html(html);
                    });
                });
        },
        addFooter() {
            templates.get("footer").then(template => {
                var intlData = {
                    "locales": "en-US"
                };

                let html = template(null, {
                    data: { intl: intlData }
                });

                $footerContainer.html(html);
            });
        },
        addLogin() {
            templates.get("login").then(template => {
                var intlData = {
                    "locales": "en-US"
                };

                let html = template(null, {
                    data: { intl: intlData }
                });

                $loginRegisterContainer.append(html);
                addLoginListener();
            });
        },
        addRegister() {
            templates.get("register").then(template => {
                var intlData = {
                    "locales": "en-US"
                };

                let html = template(null, {
                    data: { intl: intlData }
                });

                $loginRegisterContainer.append(html);
                addRegisterListener();
            });
        },
        addLogoutLink: addLogoutLink,
        addSearchListener: addSearchListener
    }
})(window);