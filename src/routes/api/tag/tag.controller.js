import { Tag } from "@/sequelize/models";
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
    message: "post deleted!"
  });
});
