"use strict";
import { encrypt } from "@/helper";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userLoginType: DataTypes.STRING,
      userSmallImageUrl: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Post);
  };

  User.createEncrypted = user => {
    const { password } = user;
    const encriptedPassword = encrypt(password);
    return User.create({
      ...user,
      password: encriptedPassword
    });
  };

  User.verify = ({ password, encryptedPassword }) => {
    const encryptedInput = encrypt(password);
    return encryptedInput === encryptedPassword;
  };

  return User;
};
