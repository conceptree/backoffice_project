require('dotenv').config();
const tables = require("../src/sequelize");
const controller = require("../controllers/controller");
const User = tables[0];

module.exports = function (app, passport, tables) {
    app.get("/", controller.renderHomePage);
    app.get("/privacy", controller.renderPrivacyPage);
    app.get("/login", controller.renderLoginPage);
    app.get("/signup", controller.renderSignUpPage);
    app.post("/signup", controller.signUpUser);
    app.post("/login", controller.logUser);
    app.delete("/movies", controller.deleteMovie);
    app.post("/movies", controller.setMovie);
    app.get("/account", controller.renderAccountPage);
    app.put("/account", controller.updateUser);
    app.get('/profile', passport.authenticate('jwt', { session: false }), controller.userProfile);
    app.get("/logout", controller.userLogout);
    app.get("/verify", controller.verifyToken);
    app.get("/newMovie", controller.renderNewMoviePage);
};

function verifySession (req, res){
    console.log(req);
}