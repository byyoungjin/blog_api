"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      emailAddress: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Post);
  };
  return User;
};
