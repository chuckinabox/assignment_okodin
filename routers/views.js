var express = require("express");
var router = express.Router();
var models = require("./../models");
var Users = models.Users;
var Profiles = models.Profiles;
var sequelize = models.sequelize;

module.exports = app => {
  router.get("/youViewed", (req, res) => {
    Users.findAll({
      where: {
        email: {
          $ne: req.session.userInfo.email
        }
      },
      include: [
        {
          model: Profiles,
          where: {
            viewers: {
              $contains: [req.session.userInfo.id]
            }
          }
        }
      ]
    }).then(users => {
      var viewed = true;
      res.render("views/views", { users, viewed });
    });
  });

  router.get("/", (req, res) => {
    Users.find({
      where: {
        email: req.session.userInfo.email
      },
      include: [Profiles]
    }).then(selfUser => {
      Users.findAll({
        where: {
          email: {
            $ne: req.session.userInfo.email
          },
          id: selfUser.Profile.viewers
        },
        include: [Profiles]
      }).then(users => {
        res.render("views/views", { users });
      });
    });
  });

  router.get("/likes", (req, res) => {
    Users.find({
      where: {
        email: req.session.userInfo.email
      },
      include: [Profiles]
    }).then(selfUser => {
      Users.findAll({
        where: {
          email: {
            $ne: req.session.userInfo.email
          },
          id: selfUser.Profile.likers
        },
        include: [Profiles]
      }).then(users => {
        var theyLikeYou = true;
        res.render("views/likes", { users, theyLikeYou });
      });
    });
  });

  router.get("/youLikedEach", (req, res) => {
    Users.find({
      where: {
        email: req.session.userInfo.email
      },
      include: [Profiles]
    }).then(selfUser => {
      Users.findAll({
        include: [Profiles],
        where: {
          email: {
            $ne: req.session.userInfo.email
          },
          id: selfUser.Profile.likers
        },
        include: [
          {
            model: Profiles,
            where: {
              likers: {
                $contains: [req.session.userInfo.id]
              }
            }
          }
        ]
      }).then(users => {
        var youLikeEachOther = true;
        res.render("views/likes", { users, youLikeEachOther });
      });
    });
  });

  router.get("/youLiked", (req, res) => {
    Users.findAll({
      where: {
        email: {
          $ne: req.session.userInfo.email
        }
      },
      include: [
        {
          model: Profiles,
          where: {
            likers: {
              $contains: [req.session.userInfo.id]
            }
          }
        }
      ]
    }).then(users => {
      var youLikeThem = true;
      res.render("views/likes", { users, youLikeThem });
    });
  });

  router.get("/likeAUser/:userId", (req, res) => {
    Users.find({
      where: { id: req.params.userId },
      include: [Profiles]
    }).then(foundUser => {
      var newArray = foundUser.Profile.likers;
      newArray.push(req.session.userInfo.id);
      Profiles.update(
        {
          likers: newArray
        },
        {
          where: {
            id: foundUser.Profile.id
          }
        }
      ).then(() => {
        res.redirect("back");
      });
    });
  });
  return router;
};
