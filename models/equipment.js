'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.equipment.belongsTo(models.Organization, {foreignkey: "organizationId", as:"equip"})
    }
  }
  equipment.init({
     id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false

    },
    Name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    organizationId: DataTypes.UUID,
    expiringDate: DataTypes.DATE,
    status: DataTypes.ENUM('available', 'unavailable'),
    images: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'equipment',
  });
  return equipment;
};