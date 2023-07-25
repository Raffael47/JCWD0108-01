'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Account);
      Transaction.belongsToMany(models.Product, {
        through: 'Transaction_detail'
      });
    }
  }
  Transaction.init({
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    payment: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    change: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('CART', 'PAID'),
      defaultValue: 'CART',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction'
  });
  return Transaction;
};