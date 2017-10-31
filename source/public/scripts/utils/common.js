/* globals $ Promise */
"use strict";

var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
var $accountContainer = $(".account-container");
var $loginRegisterContainer = $(".login-register-container");
var $paginationContainer = $(".pagination-container");
var $articlesContainer = $(".articles-container");
var $footerContainer = $("footer");
var $articleCreateContainer = $(".article-create-container");

Handlebars.registerHelper("getMonthName", function(date) {
  var d = new Date(date);
  return monthNames[d.getMonth()];
});

Handlebars.registerHelper("getDayNumber", function(date) {
  var d = new Date(date);
  return d.getDate();
});

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i + 1);
    return accum;
});

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
        createNavLink(text, id) {
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