import { Post, Tag, User } from "@/sequelize/models";
import { wrapperAsync } from "@/helper";

export const getPostsOfUser = async (req, res) => {
  const userId = req.params.userId;
  const posts = await Post.findAll({ where: { UserId: userId } });
  res.json({
    posts
  });
};

export const getPostByTagId = wrapperAsync(async (req, res) => {
  const { tagId } = req.params;
  const tagObj = await Tag.findByPk(tagId);
  const postsObjects = await tagObj.getPosts();
  const posts = postsObjects.map(postObj => postObj.dataValues);
  console.log("posts", posts);
  res.json({
    posts
  });
});

export const getPostsOfTag = async (req, res) => {
  const { tagId } = req.param;
  const tags = await Post.findOne({ tagId });
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.findAll({ include: [Tag, User] });
  res.json({
    posts
  });
};

export const getPostById = async (req, res) => {
  const postId = req.params.postId;
  const postObj = await Post.findOne({ where: { id: postId } });
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
