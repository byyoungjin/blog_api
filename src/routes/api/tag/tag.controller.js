import { Tag, Post } from "@/sequelize/models";
import { wrapperAsync } from "@/helper";

export const getAllTags = wrapperAsync(async (req, res) => {
  const tags = await Tag.findAll({ attributes: ["id", "tagName"] });
  res.json({
    tags
  });
});

export const findOrCreateTag = wrapperAsync(async (req, res) => {
  const tagData = req.body;
  const [tagObj, created] = await Tag.findOrCreate({
    where: { ...tagData }
  });
  const tagId = tagObj?.dataValues?.id;
  res.json({
    message: "tag created!",
    data: tagData,
    tagId
  });
});

export const deleteTag = wrapperAsync(async (req, res) => {
  const { tagId } = req.params;
  await Tag.destroy({ where: { id: tagId } });
  res.json({
    message: "tag deleted!"
  });
});

export const getTagsOfPostId = wrapperAsync(async (req, res) => {
  const { postId } = req.params;
  const postObj = await Post.findByPk(postId);
  const tags = await postObj.getTags();
  res.json({
    tags
  });
});

export const isInTags = wrapperAsync(async (req, res) => {
  const { tagName } = req.body;
  const tagObj = await Tag.findOne({ where: { tagName } });
  const tagId = tagObj ? tagObj.id : false;
  res.json({
    tagId
  });
});
