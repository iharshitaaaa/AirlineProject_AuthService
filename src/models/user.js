 'use strict';
const {
  Model
} = require('sequelize');

const {SALT} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // valid email address
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100] // Minimum length of 6 characters
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    const encryptedPassword = bcrypt.hashSync(user.password, SALT); // SALT is additional data we send for hashing.
    user.password = encryptedPassword;
  })
  return User;
};