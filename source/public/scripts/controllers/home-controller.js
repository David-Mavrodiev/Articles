/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}

const templates = window.templates;
const articlesData = window.articlesdata;
const usersdata = window.usersdata;
const common = window.common;

((scope) => {
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

                $(".articles-container").html(html);

                usersdata.isLoggedIn().then(username => {
                    if(username === null){
                        let loginLink = common.createNavLink("Login", "#login-modal");
                        let registerLink = common.createNavLink("Register", "#register-modal");
                        $(".ml-auto").append(loginLink, registerLink);
                        $(".login-register-container").html("");
                        
                        templates.get("login").then(template => {
                            var intlData = {
                                "locales": "en-US"
                            };
                            
                            let html = template(null, {
                                data: { intl: intlData }
                            });

                            $(".login-register-container").append(html);
                            addLoginListener();
                        });

                        templates.get("register").then(template => {
                            var intlData = {
                                "locales": "en-US"
                            };
                            
                            let html = template(null, {
                                data: { intl: intlData }
                            });

                            $(".login-register-container").append(html);
                            addRegisterListener();  
                        });
                    }
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
                password: $("#register-password").val()
            };

            usersdata.register(user)
                .then((resp) => {
                    if (resp.success) {
                        localStorage.setItem("username", resp.username);
                    } else {
                        document.location = "#/home";
                    }
            });
            ev.preventDefault();
            return false;
        });
    }

    scope.home = {
        start
    };

})(window.controllers);