module.exports = (sequelize, type) =>
  sequelize.define('movies', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: type.STRING,
    title: type.STRING,
    image: type.STRING,
   });