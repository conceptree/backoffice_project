require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;
const Cors = require('cors');
const express = require("express");
const router = require("./router");
const bcrypt = require("bcrypt");
const session = require("express-session");
const es6Renderer = require('express-es6-template-engine');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const tables = require("./sequelize");
const User = tables[0];
const app = express();

//MIDDLEWARE
app.use(Cors());
app.engine('html', es6Renderer);
app.set("views", "views");
app.set("view engine", "html");
app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    name:'session.octomovies.sid',
    cookie:  {maxAge: 30 * 60 * 1000}
})); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user[0].id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
});

passport.use(new localStrategy(function (username, password, done) {
    User.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(function(user) {

        if (!user) {
            return done(null, false, {
                message: 'Username does not exist'
            });
        }

        bcrypt.compare(password, user.passport, function(err, res){
            if(err) return done(err);
            if(res === false){
                return done(null, false, {message:"Incorrect password!"});
            }
            return done(null, user);
        });

    }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, {
            message: 'Something went wrong with your Signin'
        });
    });
})); 

app.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login?error=true'
}));

app.listen(port, host, () => {
    console.log(`Server is now running on ${host}:${port}!`);
});