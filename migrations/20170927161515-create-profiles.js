"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      locationDistance: {
        type: Sequelize.INTEGER
      },
      locationCity: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      pets: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      bodyType: {
        type: Sequelize.STRING
      },
      kids: {
        type: Sequelize.INTEGER
      },
      occupation: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      aboutMe: {
        type: Sequelize.TEXT
      },
      talents: {
        type: Sequelize.TEXT
      },
      favoriteThings: {
        type: Sequelize.TEXT
      },
      messageMe: {
        type: Sequelize.TEXT
      },
      lastLogin: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Profiles");
  }
};
