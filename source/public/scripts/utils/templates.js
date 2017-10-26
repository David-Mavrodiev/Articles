/*globals  HandlebarsIntl*/
"use strict";

const requester = window.requester;
const handlebars = window.handlebars || window.Handlebars;
HandlebarsIntl.registerWith(handlebars);

handlebars.registerHelper('grouped_each', function(every, context, options) {
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

((scope) => {
    scope.templates = {
        getByUrl(url) {
            return requester.get(url)
                .then((templateHtml) => {
                    const templateFunc = handlebars.compile(templateHtml);
                    return templateFunc;
                });
        },
        get(name) {
            const url = `/public/templates/${name}.hbs`;
            return this.getByUrl(url);
        }
    };
})(window);