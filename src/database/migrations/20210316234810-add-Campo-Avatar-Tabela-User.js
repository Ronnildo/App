'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "avatar_id", {
      type: Sequelize.INTEGER,
      references: { model: "files", key: "id"},
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      ollowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("avatar_id");
  }
};
