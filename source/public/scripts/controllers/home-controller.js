/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}

const templates = window.templates;
const articlesData = window.articlesdata;
const usersdata = window.usersdata;
const common = window.common;

((scope) => {
    let $accountContainer =  $(".account-container");
    let $loginRegisterContainer = $(".login-register-container");
    let $paginationContainer = $(".pagination-container");
    let $articlesContainer = $(".articles-container");
    let $footerContainer = $("footer");

    const start = () => {
        Promise.all([articlesData.getArticles(0, 10, ""), templates.get("home")])
            .then(([res, template]) => {
                const articles = res;
                var intlData = {
                    "locales": "en-US"
                };
                
                let html = template({ articles }, {
                    data: { intl: intlData }
                });

                $articlesContainer.html(html);

                usersdata.isLoggedIn().then(username => {
                    if(username === null){
                        let loginLink = common.createNavLinkToggle("Login", "#login-modal");
                        let registerLink = common.createNavLinkToggle("Register", "#register-modal");
                        $accountContainer.append(loginLink, registerLink);
                        
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
                    }
                    else{
                        addLogoutLink();
                    }
                });

                templates.get("pagination").then(template => {
                    var intlData = {
                        "locales": "en-US"
                    };
                    
                    let html = template(null, {
                        data: { intl: intlData }
                    });

                    $paginationContainer.append(html);  
                });

                templates.get("footer").then(template => {
                    var intlData = {
                        "locales": "en-US"
                    };
                    
                    let html = template(null, {
                        data: { intl: intlData }
                    });

                    $footerContainer.append(html);  
                });
            });
    };

    function addLoginListener(){
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
                    } else {
                        document.location = "#/home";
                    }
            });
            ev.preventDefault();
            return false;
        });
    }

    function addRegisterListener(){
        $("#btn-register").on("click", (ev) => {
            let user = {
                username: $("#register-username").val(),
                password: $("#register-password").val(),
                firstname: $("#register-firstname").val(),
                lastname: $("#register-lastname").val(),
                email: $("#register-email").val(),
                imageUrl: $("#register-image-url").val()
            };

            console.log(user);

            usersdata.register(user)
                .then((resp) => {
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

    function addLogoutLink(){
        let logoutLink = common.createNavLink("Logout", "logout");

        logoutLink.on("click", function(){
            let loginLink = common.createNavLinkToggle("Login", "#login-modal");
            let registerLink = common.createNavLinkToggle("Register", "#register-modal");
            $accountContainer.append(loginLink, registerLink);
            localStorage.removeItem("username");
            $(this).remove();
        });

        $accountContainer.html(logoutLink);
    }

    scope.home = {
        start
    };

})(window.controllers);