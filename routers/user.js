var express = require("express");
var router = express.Router();
var models = require("./../models");
var Users = models.Users;
var Profiles = models.Profiles;
var sequelize = models.sequelize;

module.exports = app => {
  router.get("/", (req, res) => {
    Users.find({
      where: {
        username: req.session.userInfo.username,
        email: req.session.userInfo.email
      },
      include: [Profiles]
    }).then(user => {
      res.render("user/profile", { user });
    });
  });
  return router;
};
