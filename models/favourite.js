module.exports = (sequelize, type) =>
  sequelize.define('favourite', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: type.INTEGER,
    movie_id: type.INTEGER
   });