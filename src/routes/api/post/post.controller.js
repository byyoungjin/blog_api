import { Post } from "@/sequelize/models";

export const getPostsOfUser = async (req, res) => {
  const userId = req.params.userId;
  const posts = await Post.findAll({ where: { UserId: userId } });
  res.json({
    posts
  });
};

export const getPostById = async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findOne({ where: { id: postId } });
  res.json({
    post
  });
};

export const createPost = async (req, res) => {
  const postData = req.body;
  await Post.create({ ...postData });
  res.json({
    message: "post created!",
    data: postData
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
