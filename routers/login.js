var express = require("express");
var router = express.Router();
var models = require("./../models");
var Users = models.Users;
var Profiles = models.Profiles;
var sequelize = models.sequelize;

module.exports = app => {
  const startPage = (req, res) => {
    if (req.session.userInfo) {
      var usernameEntered = req.session.userInfo.username;
      var emailEntered = req.session.userInfo.email;
      Users.find({
        where: { username: usernameEntered, email: emailEntered },
        include: [Profiles]
      }).then(user => {
        if (user) {
          res.render("user/profile", { user });
        } else {
          res.render("login/start", { layout: "login" });
        }
      });
    } else {
      res.render("login/start", { layout: "login" });
    }
  };

  router.get("/", startPage);
  router.get("/login", startPage);

  router.post("/login", (req, res) => {
    Users.find({
      where: { username: req.body.user.username, email: req.body.user.email },
      include: [Profiles]
    })
      .then(user => {
        if (user) {
          req.session.userInfo = {
            username: user.username,
            email: user.email,
            id: user.id
          };
          res.render("user/profile", { user });
        } else {
          res.redirect("/");
        }
      })
      .catch(() => {
        res.redirect("/");
      });
  });

  router.get("/logout", (req, res) => {
    if (req.session.userInfo) {
      req.session.userInfo = null;
    }
    res.redirect("/");
  });

  return router;
};
