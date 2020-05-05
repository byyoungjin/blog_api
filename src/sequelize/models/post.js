"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      editorState: DataTypes.TEXT,
      titlePhoto: DataTypes.STRING,
      title: DataTypes.STRING,
      subTitle: DataTypes.STRING
    },
    {}
  );
  Post.associate = function(models) {};
  return Post;
};
