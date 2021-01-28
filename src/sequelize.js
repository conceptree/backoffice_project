require('dotenv').config();
const Sequelize = require("sequelize");
const UserModel = require("../models/user");
const MovieModel = require("../models/movie");
const FavouriteModel = require("../models/favourite");

const db = {};
db[0] = new Sequelize(process.env.DBNAME, process.env.MYSQLUSER, process.env.MYSQLPASS, {
  host: "localhost",
  dialect: "mysql",
});

const tables = {};
tables[0] = UserModel(db[0], Sequelize);
tables[1] = MovieModel(db[0], Sequelize);
tables[2] = FavouriteModel(db[0], Sequelize);

module.exports = tables;