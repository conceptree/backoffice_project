const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");

router.get("/", controller.renderHomePage);
router.get("/userLogin", controller.renderLoginPage);
router.get("/registration", controller.renderRegisterPage);
router.get("/account", controller.renderAccountPage);
router.get("/movies", controller.renderMoviesPage);
router.get("/privacy", controller.renderPrivacyPage);
router.post("/register", controller.register);

module.exports = router;