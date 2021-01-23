const express = require("express");
const path = require("path");
const router  = require("./router");
const es6Renderer = require('express-es6-template-engine');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));
app.engine('html', es6Renderer);
app.set("views", "views");
app.set("view engine","html");

app.use("/", router);

app.listen(3000, () => {
    console.log("Server is now running on port 3000!");
});