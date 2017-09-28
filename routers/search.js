var express = require("express");
var router = express.Router();
var models = require("./../models");
var Users = models.Users;
var Profiles = models.Profiles;
var sequelize = models.sequelize;

module.exports = app => {
  router.get("/", (req, res) => {
    Users.findAll({
      where: {
        email: {
          $ne: req.session.userInfo.email
        }
      },
      include: [Profiles],
      order: [[Users.associations.Profile, "id", "DESC"]]
    }).then(users => {
      res.render("search/start", { users });
    });
  });

  router.post("/", (req, res) => {
    Users.findAll({
      include: [
        {
          model: Profiles,
          where: {
            gender: req.body.user.profile.gender,
            age: {
              $lt: req.body.user.profile.age
            },
            locationDistance: {
              $lt: req.body.user.profile.locationDistance
            },
            height: {
              $and: [
                {
                  $gte: req.body.user.profile.heightMin
                },
                {
                  $lte: req.body.user.profile.heightMax
                }
              ]
            },
            pets: {
              $contains: req.body.user.profile.pets
            }
          }
        }
      ],
      where: {
        email: {
          $ne: req.session.userInfo.email
        }
      },
      order: [[Users.associations.Profile, req.body.sort, "DESC"]]
    }).then(users => {
      //users = userFiltering(req.body.user.profile, users);
      var search = req.body.user.profile;
      res.render("search/start", { users, search });
    });
  });

  return router;
};
