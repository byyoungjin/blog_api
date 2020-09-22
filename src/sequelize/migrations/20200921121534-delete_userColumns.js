"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "emailAddress");
    await queryInterface.removeColumn("Users", "password");

    // return queryInterface.sequelize.transaction(t => {
    //   return Promise.all([
    //     queryInterface.removeColumn("Users", "emailAddress", {
    //       transaction: t
    //     }),
    //     queryInterface.removeColumn("Users", "password", { transaction: t })
    //   ]);
    // });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
