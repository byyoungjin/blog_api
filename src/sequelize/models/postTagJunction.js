"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostTagJunction = sequelize.define("PostTagJunction", {}, {});
  PostTagJunction.associate = function(models) {};
  return PostTagJunction;
};
