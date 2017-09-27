var express = require("express");
var router = express.Router();
var models = require("./../models");
var Users = models.Users;
var Profiles = models.Profiles;
var sequelize = models.sequelize;

module.exports = app => {
  router.get("/", (req, res) => {
    Users.find({
      where: { username: req.body.user.username, email: req.body.user.email }
    }).then(user => {
      res.render("user/profile", user);
    });
  });
  return router;
};
