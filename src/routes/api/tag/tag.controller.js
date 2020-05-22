import { Tag } from "@/sequelize/models";
import { wrapperAsync } from "@/helper";

export const getAllTags = wrapperAsync(async (req, res) => {
  const tags = await Tag.findAll({ attributes: ["id", "tagName"] });
  res.json({
    tags
  });
});

export const createTag = wrapperAsync(async (req, res) => {
  const tagData = req.body;
  const createdTag = await Tag.create({ ...tagData });
  const createdTagId = createdTag.dataValues.id;
  res.json({
    message: "tag created!",
    data: tagData,
    createdTagId
  });
});

export const isInTags = wrapperAsync(async (req, res) => {
  const { tagName } = req.body;
  const tagObj = await Tag.findOne({ where: { tagName } });
  const tagId = tagObj?.dataValues?.id;
  res.json({
    tagId: tagId ? tagId : null
  });
});
