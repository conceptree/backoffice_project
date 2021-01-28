module.exports = (sequelize, type) =>
  sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: type.STRING,
    email: type.STRING,
    password: type.STRING
   });