'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'token', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
    await queryInterface.addColumn('users', 'token_created_at', {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'token')
    await queryInterface.removeColumn('users', 'token_created_at')
  },
}
