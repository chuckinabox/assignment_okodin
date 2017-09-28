var express = require("express");
var router = express.Router();
var models = require("./../models");
var Users = models.Users;
var Profiles = models.Profiles;
var sequelize = models.sequelize;

module.exports = app => {
  router.get("/", (req, res) => {
    res.render("views/views");
  });

  router.get("/likes", (req, res) => {
    res.render("views/likes");
  });

  return router;
};
