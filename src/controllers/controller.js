const components = require("./components");
const bcrypt = require("bcrypt");
const tables = require("../sequelize");
const passport = require("passport");
const { report } = require("../router");
const User = tables[0];
const Favourites = tables[2];
const Movies = tables[1];

/// VIEWS CONTROLLERS
exports.renderHomePage = (req, res) => {
    Movies.findAll().then((movies) => {
        res.render("index", {
            locals: {
                title: 'OctoMovies | Backoffice',
                navigation:components.navigation(),
                footer:components.footer(),
                movies:movies
            }
        });
    });
};

exports.renderLoginPage = (req, res) => {
    res.render("loginPage", {
        locals: {
            title: 'OctoMovies | Login',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

exports.renderRegisterPage = (req, res) => {
    res.render("registrationPage", {
        locals: {
            title: 'OctoMovies | Register',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

exports.renderPrivacyPage = (req, res) => {
    res.render("privacy", {
        locals: {
            title: 'OctoMovies | Privacy',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

exports.renderAccountPage = (req, res) => {
    res.render("account", {
        locals: {
            title: 'OctoMovies | Account',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

exports.renderNewMoviePage = (req, res) => {
    res.render("newMovie", {
        locals: {
            title: 'OctoMovies | New Movie',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

// SESSION CONTROLLERS
exports.setupAdmin = async function (req, res){
    
    User.findOne().then( (user)=>{
        console.log(user);
        if(user){
            res.redirect('/login');
            return;
        }
        console.log("does not exists");
    
        bcrypt.genSalt(10, function(err, salt){
            if(err) return next(err);
            bcrypt.hash("admin", salt, function(err, hash){
                if(err) return next();

                User.create({
                    email: "lc@xpto.pt",
                    username: "admin",
                    password: hash,
                  }).then((user) => {
                    res.redirect("/login");
                  });

            });
        });
    });  
};

/// REST
exports.setFavourite = (req, res)=>{
    
};

exports.setMovie = (req, res)=>{
    console.log(req.body);
    Movies.create({
        title:req.body.title,
        description:req.body.description,
        image:req.body.image
    }).then(movie => {
        res.redirect("/");
    });
};

exports.deleteMovie = (req, res)=>{
   Movies.destroy({where:{id:req.body.id}}).then(message => {
    res.redirect("/login");
   });
};

exports.setUser = (req, res)=>{
    User.findOne({where:{
        username:req.body.username
    }}).then( (user)=>{
        console.log(user);
        if(user){
            res.send('User Already exists!');
            return;
        }
        console.log("does not exists");
    
        bcrypt.genSalt(10, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(req.body.password, salt, function(err, hash){
                if(err) return next();

                User.create({
                    email: req.body.username,
                    username: req.body.username,
                    password: hash,
                  }).then((user) => {
                    res.redirect("/login");
                  });

            });
        });
    });  
};

exports.logUser = (req, res)=>{


    
};

