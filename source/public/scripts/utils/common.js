/* globals $ Promise */
"use strict";

((scope) => {
    scope.common = {
        createNavLinkToggle(text, targetId) {
            let button = $("<button>");
            button.addClass("btn");
            button.addClass("btn-default");
            button.addClass("account-btn");
            button.attr("data-toggle", "modal");
            button.attr("data-target", targetId);
            button.text(text);
            let li = $("<li>");
            li.addClass("nav-item");
            let link = $("<a>");
            li.append(button);

            return li;
        },
        createNavLink(text, id){
            let a = $("<a>");
            a.addClass("nav-link");
            a.attr("id", id);
            a.text("Logout");
            let li = $("<li>");
            li.addClass("nav-item");
            let link = $("<a>");
            li.append(a);

            return li;
        }
    }
})(window);