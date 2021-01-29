const components = require("./components");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const tables = require("../src/sequelize");
const User = tables[0];
const Favourits = tables[2];
const Movies = tables[1];
let authenticatedUser = null;

/// RENDER HOME PAGE CONTROLLER
exports.renderHomePage = function (req, res, next) {
    Movies.findAll().then((movies) => {
        Favourits.findAll().then((favourits) => {
            res.render("index", {
                locals: {
                    title: 'OctoMovies | Backoffice',
                    navigation: components.navigation(authenticatedUser ? authenticatedUser.username : 'Account' ),
                    footer: components.footer(),
                    movies: movies,
                    user:authenticatedUser
                }
            });
        });
    });
};
/// RENDER LOGIN PAGE CONTROLLER
exports.renderLoginPage = function (req, res) {
    res.render("loginPage", {
        locals: {
            title: 'OctoMovies | Login',
            navigation: components.navigation(authenticatedUser ? authenticatedUser.username : 'Account' ),
            footer: components.footer()
        }
    });
};
/// RENDER SIGNUP PAGE CONTROLLER
exports.renderSignUpPage = function (req, res) {
    res.render("registrationPage", {
        locals: {
            title: 'OctoMovies | Register',
            navigation: components.navigation(authenticatedUser ? authenticatedUser.username : 'Account' ),
            footer: components.footer()
        }
    });
};
/// RENDER PRIVACY CONTROLLER
exports.renderPrivacyPage = function (req, res) {
    res.render("privacy", {
        locals: {
            title: 'OctoMovies | Privacy',
            navigation: components.navigation(authenticatedUser ? authenticatedUser.username : 'Account' ),
            footer: components.footer(),
            user:authenticatedUser
        }
    });
};
/// RENDER ACCOUNT PAGE CONTROLLER
exports.renderAccountPage = function (req, res) {
    res.render("account", {
        locals: {
            title: 'OctoMovies | Account',
            navigation: components.navigation(authenticatedUser ? authenticatedUser.username : 'Account' ),
            footer: components.footer(),
            user:authenticatedUser
        }
    });
};
/// RENDER MOVIE PAGE CONTROLLER
exports.renderNewMoviePage = function (req, res) {
    res.render("newMovie", {
        locals: {
            title: 'OctoMovies | New Movie',
            navigation: components.navigation(authenticatedUser ? authenticatedUser.username : 'Account' ),
            footer: components.footer()
        }
    });
};

/// SAVE MOVIE CONTROLLER
exports.setMovie = function (req, res) {
    Movies.create({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    }).then(movie => {
        res.redirect("/");
    });
};
/// DELETE MOVIE CONTROLLER
exports.deleteMovie = function (req, res) {
    console.log(req);
    Movies.destroy({ where: { id: req.body.id } }).then(message => {
        res.redirect("/");
    });
};
/// SIGNUP CONTROLLER
exports.signUpUser = function (req, res) {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if (!user) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) return next(err);
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    if (err) return next();
                    User.create({
                        email: req.body.email,
                        username: req.body.username,
                        password: hash,
                    }).then((result) => {
                        req.logout();
                        res.redirect("/login");
                    });
                });
            });

        } else {
            res.send("User Already Exists!");
        }
    });
};
/// LOGIN CONTROLLER
exports.logUser = async function (req, res) { 
    const user = await User.findOne({where:{username:req.body.username}});
    if(user){
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(validPassword){
            const token = jwt.sign(user.toJSON(), 'secret', { expiresIn: '30m' });
            authenticatedUser = user;
            res.json({
                success: true,
                token: 'Bearer '+token,
                user: {
                    id: user.id,
                    email: user.email,
                    password: user.password
                }
            });
        }else{
            res.status(400).json({message:"Invalid password!"});
        }
    }else{
        res.status(401).json({error:"User does not exist!"});
    }
};
/// PROFILE CONTROLLER
exports.userProfile = function(req, res, next){
    res.send(req.user);
};
/// UPDATE USER CONTROLLER
exports.updateUser = function(req, res){
    if(req.body.username){
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                if (err) return next();
                User.update(
                    {username: req.body.username},
                    {where:req.body.id}
                  )
                  .then(function(rowsUpdated) {
                    res.json(rowsUpdated);
                  })
                  .catch(next);
            });
        });
    }
};
/// LOGOUT CONTROLLER
exports.userLogout = function(req, res){
    req.logout();
    res.redirect("/");
};
/// VERIFY TOKEN
exports.verifyToken = function(req, res){
    if(typeof req.headers.authorization !== 'undefined'){
        jwt.verify(req.headers.authorization, "secret", (err, result)=>{
            if(err){
                if(err.name == "TokenExpiredError"){
                    res.send("Expired"); 
                }
                else{
                    res.send(err.message);
                }
            }
            else{
                res.send(result);
            }
        });
    }else{
        res.sendStatus(403);
    }
};