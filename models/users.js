"use strict";
var models = require("./../models");

module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    profileId: DataTypes.INTEGER
  });
  Users.associate = function(models) {
    // associations can be defined here
    this.hasOne(models.Profiles, { foreignKey: "userId" });
  };
  return Users;
};
