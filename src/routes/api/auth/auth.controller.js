import { Post, User } from "@/sequelize/models";

import { wrapperAsync } from "@/helper";
import {
  checkUniqueEmail,
  checkRegisteredEmail,
  checkUserPassword,
  issueTokenToUser
} from "./helper";

import { CookieHelper } from "../helper/CookieHelper";

const cookieHelper = new CookieHelper();

export const register = wrapperAsync(async (req, res) => {
  const user = req.body;
  const { emailAddress } = user;
  //check User email
  await checkUniqueEmail(emailAddress);

  //assign User
  const userObj = await User.createEncrypted(user);
  res.json(userObj.dataValues);
});

export const login = wrapperAsync(async (req, res) => {
  const userInfo = req.body;

  const { emailAddress, password } = userInfo;

  const userObj = await checkRegisteredEmail(emailAddress);
  const user = userObj.dataValues;
  const encryptedPassword = user.password;
  await checkUserPassword({ password, encryptedPassword });

  const userWithToken = await issueTokenToUser(user);
  const { token } = userWithToken;
  console.log("token", token);

  const cookieSetting = cookieHelper.getCookieSetting();
  console.log("cookieSetting", cookieSetting);
  res.cookie("AUTH_TOKEN", token, cookieSetting).json(userWithToken);
});

export const whoAmI = (req, res) => {
  const { decoded } = req;
  res.json(decoded);
};
