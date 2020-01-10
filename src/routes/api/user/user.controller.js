import { User } from "@/sequelize/models";

export const list = async (req, res, next) => {
  if (isAuthorizedByToken(req, res)) {
    User.findAll().then(users => {
      res.json({
        users
      });
    });
  }
};

export const assignAdmin = (req, res, next) => {
  if (isAuthorizedByToken(req, res)) {
    const userToUpdate = req.params.emailAddress;
    User.assignAdmin(userToUpdate).then(() => {
      res.json({
        success: true
      });
    });
  }
};

const isAuthorizedByToken = (req, res) => {
  if (!req.decoded.admin) {
    res.status(403).json({
      message: "you are not authorized"
    });
    return false;
  }
  return true;
};
