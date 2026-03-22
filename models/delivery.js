'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Organization.hasMany(models.delivery, {foreignKey: 'organizationId', as: 'delive'})
      models.staffTables.hasMany(models.delivery, {foreignKey: 'staffId', as: 'steff'})
    }
  }
  delivery.init({
    id: { 
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    processBy: DataTypes.STRING,
    status:DataTypes.ENUM('pending', 'in_progress', 'completed'),
    clothes: DataTypes.STRING,
    organizationId: DataTypes.STRING,
    staffId: DataTypes.STRING,
    orderId: DataTypes.STRING




  }, {
    sequelize,
    modelName: 'delivery',
  });
  return delivery;
};