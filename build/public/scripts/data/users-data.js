"use strict";

/* globals  */

var requester = window.requester;

(function (scope) {

    scope.usersdata = {
        getUserByUsername: function getUserByUsername(username) {
            return requester.getJSON("/api/users/" + username);
        },
        getUserByUsernameSync: function getUserByUsernameSync(username) {
            requester.getJSON("/api/users/" + username).then(function (user) {
                console.log(user);
                return user;
            });
        },
        login: function login(user) {
            return requester.putJSON("/api/users/login", user);
        },
        register: function register(user) {
            return requester.postJSON("/api/users/register", user);
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