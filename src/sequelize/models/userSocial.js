"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserSocial = sequelize.define(
    "UserSocial",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      providerType: DataTypes.STRING,
      providerKey: DataTypes.STRING
    },
    {}
  );
  UserSocial.associate = function(models) {
    UserSocial.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "cascade"
    });
  };
  return UserSocial;
};
