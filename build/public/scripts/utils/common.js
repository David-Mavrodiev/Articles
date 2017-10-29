/* globals $ Promise */
"use strict";

(function (scope) {
    scope.common = {
        createNavLink: function createNavLink(text) {
            var button = $("<button>");
            button.addClass("btn");
            button.addClass("btn-default");
            button.attr("data-toggle", "modal");
            button.attr("data-target", "#login-modal");
            button.text(text);
            var li = $("<li>");
            li.addClass("nav-item");
            var link = $("<a>");
            li.append(button);

            return li;
        }
    };
})(window);