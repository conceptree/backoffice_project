module.exports = (sequelize, type) =>
  sequelize.define('favourite', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: type.INTEGER,
    movieId: type.INTEGER
   });