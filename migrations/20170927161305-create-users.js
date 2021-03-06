"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Users", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        username: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        profileId: {
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
      })
      .then(() => {
        return queryInterface.addIndex("Users", ["username"]);
      })
      .then(() => {
        return queryInterface.addIndex("Users", ["email"]);
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
