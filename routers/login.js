var express = require("express");
var router = express.Router();
var models = require("./../models");
var Users = models.Users;
var sequelize = models.sequelize;

module.exports = app => {
  const startPage = (req, res) => {
    res.render("login/start", { layout: "login" });
  };

  router.get("/", startPage);
  router.get("/login", startPage);

  router.post("/login", (req, res) => {
    Users.find({
      where: { username: req.body.user.username, email: req.body.user.email }
    })
      .then(user => {
        if (user) {
          res.render("user/profile", user);
        } else {
          res.redirect("/");
        }
      })
      .catch(() => {
        res.redirect("/");
      });
  });

  return router;
};
