import { Post, User } from "@/sequelize/models";

import { wrapperAsync } from "@/helper";
import {
  checkUniqueEmail,
  checkRegisteredEmail,
  checkUserPassword,
  issueTokenToUser
} from "./helper";

/**
 * POST /api/auth/register
 *{
     emailAddress,
     password,
     firstName,
     lastName,
     admin
 } 
 *
 */

export const register = wrapperAsync(async (req, res) => {
  const user = req.body;
  const { emailAddress } = user;
  //check User email
  await checkUniqueEmail(emailAddress);

  //assign User
  const userObj = await User.createEncrypted(user);
  res.json(userObj.dataValues);
});

/**
 * POST /api/auth/login
 *{
     emailAddress,
     password
 } 
 *
 */
export const login = wrapperAsync(async (req, res) => {
  const userInfo = req.body;

  const { emailAddress, password } = userInfo;

  const userObj = await checkRegisteredEmail(emailAddress);
  const user = userObj.dataValues;
  const encryptedPassword = user.password;
  await checkUserPassword({ password, encryptedPassword });

  const userWithToken = await issueTokenToUser(user);
  res.json(userWithToken);
});

export const whoAmI = (req, res) => {
  const { decoded } = req;
  res.json(decoded);
};
