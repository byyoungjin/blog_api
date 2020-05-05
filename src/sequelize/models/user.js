"use strict";
import { encrypt } from "@/helper";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      emailAddress: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      admin: DataTypes.BOOLEAN
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Post);
  };

  User.assignAdmin = emailAddress => {
    return User.update(
      {
        admin: true
      },
      {
        where: {
          emailAddress
        }
      }
    );
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
    const encriptedInput = encrypt(password);
    return encriptedInput === encryptedPassword;
  };

  return User;
};
