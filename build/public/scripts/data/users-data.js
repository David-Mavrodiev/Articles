"use strict";

/* globals  */

var requester = window.requester;

(function (scope) {

    scope.usersdata = {
        login: function login(user) {
            return requester.putJSON(window.path + "/api/account/login", user);
        },
        register: function register(user) {
            return requester.postJSON(window.path + "/api/account/register", user);
        },
        logout: function logout() {
            return Promise.resolve().then(function () {
                localStorage.removeItem("username");
            });
        },
        isLoggedIn: function isLoggedIn() {
            return Promise.resolve().then(function () {
                var username = localStorage.getItem("username");
                return username;
            });
        }
    };
})(window);