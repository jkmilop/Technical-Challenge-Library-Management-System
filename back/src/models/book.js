const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

const Book = sequelize.define(
  'Book',
  {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_copies: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Book;
