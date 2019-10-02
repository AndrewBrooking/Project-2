module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Users;
};
