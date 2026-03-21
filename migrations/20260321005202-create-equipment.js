'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipment', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
      },
      Name: {
        type: Sequelize.STRING,
         allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
         allowNull: false,

      },
      expiringDate: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW,
         allowNull: false,
      },
       organizationId: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Organizations',
          key: 'id'
        },
      }, 
      status: {
        type: Sequelize.ENUM('available', 'unavailable')  ,
        allowNull: false
      },
      images: {
        type: Sequelize.JSON,
         allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipment');
  }
};