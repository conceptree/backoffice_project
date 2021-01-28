const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");

/// page renders
router.get("/", isLoggedIn, controller.renderHomePage);
router.get("/login", controller.renderLoginPage);
router.get("/register", controller.renderRegisterPage);
router.get("/account", controller.renderAccountPage);
router.get("/privacy", controller.renderPrivacyPage);
router.get("/newMovie", controller.renderNewMoviePage);
/// rest controllers
router.get("/setup", controller.setupAdmin);
router.post("/favourits", controller.setFavourite);
router.post("/movies", controller.setMovie);
router.post("/register", controller.setUser);
router.delete("/movies", controller.deleteMovie);
router.post("/login", controller.logUser);

function isLoggedIn(req, res, next){
   console.log(req);
}

function isLoggedOut(req, res, next){
    if(!req.headers.cookie) return next();
    res.redirect('/');
}

module.exports = router;