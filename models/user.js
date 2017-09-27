"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("Users", {
    username: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return User;
};
