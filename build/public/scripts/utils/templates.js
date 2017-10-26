/*globals  HandlebarsIntl*/
"use strict";

var requester = window.requester;
var handlebars = window.handlebars || window.Handlebars;
HandlebarsIntl.registerWith(handlebars);

handlebars.registerHelper('grouped_each', function (every, context, options) {
    var out = "",
        subcontext = [],
        i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});

(function (scope) {
    scope.templates = {
        getByUrl: function getByUrl(url) {
            return requester.get(url).then(function (templateHtml) {
                var templateFunc = handlebars.compile(templateHtml);
                return templateFunc;
            });
        },
        get: function get(name) {
            var url = "/public/templates/" + name + ".hbs";
            return this.getByUrl(url);
        }
    };
})(window);