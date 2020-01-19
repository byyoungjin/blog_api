"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      editorContentState: DataTypes.TEXT,
      editorTitleState: DataTypes.LONGTEXT
    },
    {}
  );
  Post.associate = function(models) {};
  return Post;
};
