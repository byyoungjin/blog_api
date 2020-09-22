"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserTraditional = sequelize.define(
    "UserTraditional",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      emailAddress: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  UserTraditional.associate = function(models) {
    UserTraditional.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "cascade"
    });
  };
  return UserTraditional;
};
