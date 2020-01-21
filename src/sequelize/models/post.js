"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      editorContentState: DataTypes.TEXT("long"),
      editorTitleState: DataTypes.TEXT
    },
    {}
  );
  Post.associate = function(models) {};
  return Post;
};
