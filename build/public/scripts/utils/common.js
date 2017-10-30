/* globals $ Promise */
"use strict";

(function (scope) {
    scope.common = {
        createNavLinkToggle: function createNavLinkToggle(text, targetId) {
            var button = $("<button>");
            button.addClass("btn");
            button.addClass("btn-default");
            button.addClass("account-btn");
            button.attr("data-toggle", "modal");
            button.attr("data-target", targetId);
            button.text(text);
            var li = $("<li>");
            li.addClass("nav-item");
            var link = $("<a>");
            li.append(button);

            return li;
        },
        createNavLink: function createNavLink(text, id) {
            var a = $("<a>");
            a.addClass("nav-link");
            a.attr("id", id);
            a.text("Logout");
            var li = $("<li>");
            li.addClass("nav-item");
            var link = $("<a>");
            li.append(a);

            return li;
        }
    };
})(window);