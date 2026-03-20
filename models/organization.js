'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Organization.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false

    },
    logo: DataTypes.JSON,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};