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
      models.staffTables.belongsTo(models.Organization, {foreignKey: "organizationId", as:"org"})
    }
  }
  staffTables.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    staffName: DataTypes.STRING,
    position: DataTypes.STRING,
    organizationId: DataTypes.STRING,
    staffDp: DataTypes.JSON,
    salary: DataTypes.STRING,
    profilePhoto: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'staffTables',
    tableName: 'stafftables',
    freezeTableName: true 
  });
  return staffTables;
};