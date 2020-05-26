import { PostTagJunction } from "@/sequelize/models";
import { wrapperAsync } from "@/helper";

export const findOrMapPostTag = wrapperAsync(async (req, res) => {
  const { TagId, PostId } = req.body;
  const createdMapping = await PostTagJunction.findOrCreate({
    where: { TagId, PostId }
  });
  res.json({
    createdMapping,
    message: "tag post mapping completed."
  });
});

export const deletePostTagMapping = wrapperAsync(async (req, res) => {
  const { TagId, PostId } = req.params;
  await PostTagJunction.destroy({ where: { TagId, PostId } });
  res.json({
    message: "post tag mapping deleted!"
  });
});
