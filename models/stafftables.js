'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class staffTables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  staffTables.init({
    staffName: DataTypes.STRING,
    position: DataTypes.STRING,
    organizationId: DataTypes.UUID,
    staffDp: DataTypes.JSON,
    salary: DataTypes.INTEGER,
    profilePhoto: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'staffTables',
  });
  return staffTables;
};