"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      tagName: DataTypes.STRING
    },
    {}
  );
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Post, { through: "PostTagJunction" });
  };
  return Tag;
};
