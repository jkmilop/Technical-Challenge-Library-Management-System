const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');
const BorrowedBook = sequelize.define(
  'BorrowedBook',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BorrowedBook',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = BorrowedBook;
