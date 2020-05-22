import { PostTagJunction } from "@/sequelize/models";
import { wrapperAsync } from "@/helper";

export const mapPostTag = wrapperAsync(async (req, res) => {
  const { TagId, PostId } = req.body;
  const createdMapping = await PostTagJunction.create({ TagId, PostId });
  res.json({
    createdMapping,
    message: "tag post mapping completed."
  });
});
