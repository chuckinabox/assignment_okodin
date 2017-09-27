"use strict";
var models = require("./../models");

module.exports = (sequelize, DataTypes) => {
  var Profiles = sequelize.define("Profiles", {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    locationDistance: DataTypes.INTEGER,
    locationCity: DataTypes.STRING,
    height: DataTypes.INTEGER,
    status: DataTypes.STRING,
    petsDogs: DataTypes.INTEGER,
    petsCats: DataTypes.INTEGER,
    petsHorses: DataTypes.INTEGER,
    petsOther: DataTypes.INTEGER,
    image: DataTypes.STRING,
    aboutMe: DataTypes.TEXT,
    talents: DataTypes.TEXT,
    favoriteThings: DataTypes.TEXT,
    messageMe: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  });
  Profiles.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Users, { foreignKey: "userId" });
  };
  return Profiles;
};
