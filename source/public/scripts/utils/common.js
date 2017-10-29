/* globals $ Promise */
"use strict";

((scope) => {
    scope.common = {
        createNavLink(text, targetId) {
            let button = $("<button>");
            button.addClass("btn");
            button.addClass("btn-default");
            button.attr("data-toggle", "modal");
            button.attr("data-target", targetId);
            button.text(text);
            let li = $("<li>");
            li.addClass("nav-item");
            let link = $("<a>");
            li.append(button);

            return li;
        },
    }
})(window);