"use strict";
import crypto from "crypto";
import config from "@/config";
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

  User.createEncripted = user => {
    const { password } = user;
    const encripted = crypto
      .createHmac("sha1", config.secret)
      .update(password)
      .digest("base64");
    return User.create({
      ...user,
      password: encripted
    });
  };

  User.verify = (inputPassword, EncryptedPassword) => {
    const encriptedInput = crypto
      .createHmac("sha1", config.secret)
      .update(inputPassword)
      .digest("base64");
    return encriptedInput === EncryptedPassword;
  };

  return User;
};
