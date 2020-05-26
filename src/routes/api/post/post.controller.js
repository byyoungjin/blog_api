import { Post, Tag, User } from "@/sequelize/models";
import { wrapperAsync } from "@/helper";

const postIncludes = [
  Tag,
  {
    model: User,
    attributes: ["id", "emailAddress", "firstName", "lastName"]
  }
];

export const getPostsOfUser = async (req, res) => {
  const userId = req.params.userId;
  const posts = await Post.findAll({
    where: { UserId: userId },
    include: postIncludes
  });
  res.json({
    posts
  });
};

export const getPostByTagId = wrapperAsync(async (req, res) => {
  const { tagId } = req.params;
  const tagObj = await Tag.findByPk(tagId);
  const postsObjects = await tagObj.getPosts({
    include: postIncludes
  });
  const posts = postsObjects.map(postObj => postObj.dataValues);
  res.json({
    posts
  });
});

export const getAllPosts = async (req, res) => {
  const posts = await Post.findAll({
    include: postIncludes
  });
  res.json({
    posts
  });
};

export const getPostById = async (req, res) => {
  const postId = req.params.postId;
  const postObj = await Post.findOne({
    where: { id: postId },
    include: postIncludes
  });
  const post = postObj.dataValues;
  res.json(post);
};

export const createPost = async (req, res) => {
  const postData = req.body;
  const createdPost = await Post.create({ ...postData });
  const createdPostId = createdPost.dataValues.id;
  res.json({
    message: "post created!",
    data: postData,
    createdPostId
  });
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  await Post.destroy({ where: { id: postId } });
  res.json({
    message: "post deleted!"
  });
};

export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const newPost = req.body;
  await Post.update(newPost, { where: { id: postId } });
  res.status(204).json({
    message: "post updated!"
  });
};
