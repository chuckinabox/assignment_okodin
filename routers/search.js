var express = require("express");
var router = express.Router();
var models = require("./../models");
var Users = models.Users;
var Profiles = models.Profiles;
var sequelize = models.sequelize;

var userFiltering = function(profile, users) {
  //Check/Filter Gender
  if (profile.gender && profile.gender != "both") {
    for (var i = 0; i < users.length; i++) {
      if (users[i].Profile.gender != profile.gender) {
        users.splice(i, 1);
      }
    }
  }
  //Check/Filter Dropdowns Age/Distance/Height
  for (var i = 0; i < users.length; i++) {
    var remove = 0;
    if (users[i].Profile.age > profile.age) {
      remove = 1;
    }
    if (users[i].Profile.locationDistance > profile.locationDistance) {
      remove = 1;
    }
    if (
      users[i].Profile.height > profile.heightMax ||
      users[i].Profile.height < profile.heightMin
    ) {
      remove = 1;
    }
    if (remove) {
      remove = 0;
      users.splice(i, 1);
    }
  }
  //Check/Filter Status
  if (profile.status) {
    for (var i = 0; i < users.length; i++) {
      var remove = 1;
      for (var j = 0; j < profile.status; j++) {
        if (users[i].Profile.status === profile.status[j]) {
          remove = 0;
        }
      }
      if (remove) {
        users.splice(i, 1);
      }
    }
  }
  //Check/Filter Pets
  if (profile.pets) {
    for (var i = 0; i < users.length; i++) {
      var remove = 1;
      if (users[i].Profile.petsDogs && profile.pets === "Dogs") {
        remove = 0;
      }
      if (users[i].Profile.petsCats && profile.pets === "Cats") {
        remove = 0;
      }
      if (users[i].Profile.petsHorses && profile.pets === "Horses") {
        remove = 0;
      }
      if (users[i].Profile.petsOther && profile.pets === "Other") {
        remove = 0;
      }
      if (remove) {
        users.splice(i, 1);
      }
    }
  }
  return users;
};

module.exports = app => {
  router.get("/", (req, res) => {
    Users.findAll({
      where: {
        email: {
          $ne: req.session.userInfo.email
        }
      },
      include: [Profiles]
    }).then(users => {
      res.render("search/start", { users });
    });
  });

  router.post("/", (req, res) => {
    Users.findAll({
      where: {
        email: {
          $ne: req.session.userInfo.email
        }
      },
      include: [Profiles]
    }).then(users => {
      users = userFiltering(req.body.user.profile, users);
      var search = req.body.user.profile;
      res.render("search/start", { users, search });
    });
  });

  return router;
};
