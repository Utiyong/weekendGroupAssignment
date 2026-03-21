'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    Type: DataTypes.STRING,
    images: DataTypes.STRING,
    amount: DataTypes.STRING,
    status: DataTypes.ENUM('In Transit', 'Shipped', 'Out for delivery', 'Delivered'),
    staff:DataTypes.STRING,
    staffId: DataTypes.STRING,
    organizationId: DataTypes.STRING

    

  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};