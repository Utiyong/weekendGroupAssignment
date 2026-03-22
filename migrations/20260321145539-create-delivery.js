'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deliveries', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
      },
      processBy: {
        type: Sequelize.STRING,
         allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'in_progress', 'completed')  ,
         allowNull: false,
      },
      clothes: { 
        type: Sequelize.STRING,
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
      staffId: {
        allowNull: false,
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: 'staffTables',
          key: 'id'
        }
      },
      orderId: {
        allowNull: false,
        type: Sequelize.UUID,
        foreignKey:true,
        references: {
          model: 'orders',
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
    await queryInterface.dropTable('deliveries');
  }
};