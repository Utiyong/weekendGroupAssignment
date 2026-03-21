'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Type: {
         allowNull: false,
        type: Sequelize.STRING
      },
      images: {
         allowNull: false,
        type: Sequelize.STRING
      },
      amount: {
         allowNull: false,
        type: Sequelize.STRING
      },
      status: {
         allowNull: false,
        type: Sequelize.ENUM('In Transit', 'Shipped', 'Out for delivery', 'Delivered')
      },
      staff:{
        allowNull: false,
        type: Sequelize.STRING
      },
      staffId: {
        allowNull: false,
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: 'staffTables',
          key: 'id'
        }
      },
      organizationId: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Organizations',
          key: 'id'
        }
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
    await queryInterface.dropTable('orders');
  }
};