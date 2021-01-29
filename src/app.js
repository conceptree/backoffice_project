require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;
const Cors = require('cors');
const express = require("express");
const es6Renderer = require('express-es6-template-engine');
const passport = require('passport');
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(Cors());

//PASSPORT
require("../config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

/// VIEWS ENGINE
app.use(express.static("public"));
app.engine('html', es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

//ROUTES
require("../routes/routes")(app, passport);

///START SERVER
app.listen(port, host, () => {
    console.log(`Server is now running on ${host}:${port}!`);
});