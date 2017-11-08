/* globals $ Promise */
"use strict";
const usersdata = window.usersdata;
const articlesdata = window.articlesdata;
const common = window.common;

((scope) => {
    function addArticleCreate() {
        let articleCreateLink = common.createNavLinkToggle("Create article", "#create-article-modal");

        $accountContainer.append(articleCreateLink);

        templates.get("create-article").then(template => {
            var intlData = {
                "locales": "en-US"
            };

            let html = template(null, {
                data: { intl: intlData }
            });

            $articleCreateContainer.append(html);
            addCreateArticleListener();
        });
    }

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

    function addReplyListener(){
        console.log($("#btn-reply"));
        $("#btn-reply").on("click", (ev) => {
            let articleId = $(this).attr("data-articleid");
            let commentId = $(this).attr("data-commentid");
            let content = $("#reply-content").val();
            
            articlesdata.addReply(articleId, commentId, content)
                .then((resp) => {
                    location.reload();
                });
        });
    }

    function addSearchListener() {
        $('#search-box').on('keydown', function(e) {
            console.log("Click");
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

    function addCreateArticleListener() {
        $("#btn-create-article").on("click", function() {
            let article = {
                title: $("#article-title").val(),
                description: $("#article-description").val(),
                category: $("#article-category").val(),
                image: $("#article-image-link").val()
            };

            articlesdata.addArticle(article)
                .then((resp) => {
                    $("#create-article-modal").modal("hide");
                    Promise.all([articlesData.getArticles(0, 5, ""), templates.get("articles")])
                        .then(([res, template]) => {
                            const articles = res;
                            var intlData = {
                                "locales": "en-US"
                            };

                            let html = template({ articles }, {
                                data: { intl: intlData }
                            });

                            $articlesContainer.html(html);
                        });
                });
        });
    }

    function addCreateCommentListener(articleId){
        $("#add-comment").on("click", function(){
            let body = {
                articleId: articleId,
                content: $("#comment-content").val()
            };

            articlesdata.addComment(body)
                .then((comment) => {
                    location.reload();
                });
        });
    }

    function addRightBar(){
        
    }

    scope.helper = {
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
        addArticleCreate: addArticleCreate,
        addSearchListener: addSearchListener,
        addCreateCommentListener: addCreateCommentListener,
        addReplyListener: addReplyListener
    }
})(window);