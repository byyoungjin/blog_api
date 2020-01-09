"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      editorContentState: DataTypes.STRING,
      editorTitleState: DataTypes.STRING
    },
    {}
  );
  Post.associate = function(models) {};
  return Post;
};
