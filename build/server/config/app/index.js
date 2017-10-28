'use strict';

const path = require("path"),
    express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    exphbs = require('express-handlebars');

const data = require('../../data');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'purple unicorn' }));

app.use("/libs", express.static(path.join(__dirname, "../../../../node_modules")));
app.use("/public", express.static(path.join(__dirname, "/../../../public")));

app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "build/views/");
app.get("/", (req, res) => res.render("index", { layout: false }));

require('../passport/')(app, data);
require('../../routing/users-router')(app);
require('../../routing/articles-router')(app);

module.exports = app;