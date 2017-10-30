/* globals $ Promise */
"use strict";
const usersdata = window.usersdata;
const common = window.common;

((scope) => {
    function addArticleCreate($accountContainer){
        let articleCreateLink = common.createNavLinkToggle("Create article", "#create-article-modal");
        $accountContainer.append(articleCreateLink);

        templates.get("create-article").then(template => {
            var intlData = {
                "locales": "en-US"
            };
            
            let html = template(null, {
                data: { intl: intlData }
            });

            $accountContainer.append(html);  
        });
    }
    function addLogoutLink($accountContainer){
        let logoutLink = common.createNavLink("Logout", "logout");

        logoutLink.on("click", function(){
            $accountContainer.html("");
            let loginLink = common.createNavLinkToggle("Login", "#login-modal");
            let registerLink = common.createNavLinkToggle("Register", "#register-modal");
            $accountContainer.append(loginLink, registerLink);
            usersdata.logout();
        });

        $accountContainer.html(logoutLink);
    }

    function addLoginListener($accountContainer) {
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
                        addLogoutLink($accountContainer);
                        if($.inArray("admin", resp.userrole)){
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

    function addRegisterListener($accountContainer){
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
                        if($.inArray("admin", resp.user.roles)){
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
        addPagination($paginationContainer){
            templates.get("pagination").then(template => {
                var intlData = {
                    "locales": "en-US"
                };
                
                let html = template(null, {
                    data: { intl: intlData }
                });

                $paginationContainer.append(html);  
            });
        },
        addFooter($footerContainer){
            templates.get("footer").then(template => {
                var intlData = {
                    "locales": "en-US"
                };
                
                let html = template(null, {
                    data: { intl: intlData }
                });

                $footerContainer.append(html);  
            });
        },
        addLogin($loginRegisterContainer, $accountContainer){
            templates.get("login").then(template => {
                var intlData = {
                    "locales": "en-US"
                };
                
                let html = template(null, {
                    data: { intl: intlData }
                });

                $loginRegisterContainer.append(html);
                addLoginListener($accountContainer);
            });
        },
        addRegister($loginRegisterContainer, $accountContainer){
            templates.get("register").then(template => {
                var intlData = {
                    "locales": "en-US"
                };
                
                let html = template(null, {
                    data: { intl: intlData }
                });

                $loginRegisterContainer.append(html);
                addRegisterListener($accountContainer);  
            });
        },
        addLogoutLink: addLogoutLink,
        addArticleCreate: addArticleCreate
    }
})(window);