import { Post, User } from "@/sequelize/models";

import { wrapperAsync } from "@/helper";
import {
  checkUniqueEmail,
  getUserWithEmail,
  checkUserPassword,
  issueTokenToData,
  createUserAndUserTraditional,
  getUserWithProviderKeyOrCreate
} from "./helper";

import config from "@/config";

const { accessTokenSecret, refreshTokenSecret } = config;

import { CookieHelper } from "../helper/CookieHelper";

const cookieHelper = new CookieHelper();

export const registerTraditional = wrapperAsync(async (req, res) => {
  const userRegisterInfo = req.body;
  const { emailAddress } = userRegisterInfo;
  await checkUniqueEmail(emailAddress);

  const userData = await createUserAndUserTraditional({
    ...userRegisterInfo,
    userLoginType: "traditional"
  });
  res.json(userData);
});

export const loginTraditional = wrapperAsync(async (req, res) => {
  const userLoginInfo = req.body;

  const { emailAddress, password } = userLoginInfo;

  const user = await getUserWithEmail(emailAddress);

  const encryptedPassword = user.password;
  await checkUserPassword({ password, encryptedPassword });

  const userBasicData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    uniqueAlias: user.emailAddress
  };

  const userAccessToken = await issueTokenToData({
    data: userBasicData,
    secretKey: accessTokenSecret
  });

  const accessToken = userAccessToken.token;

  const cookieSetting = cookieHelper.getCookieSetting();
  res.cookie("AUTH_ACCESS_TOKEN", accessToken, cookieSetting);
  res.json(userBasicData);
});

/**
 * userSocialInfo
 * {
 * providerKey, providerType, firstName, lastName
 * }
 */
export const loginSocial = wrapperAsync(async (req, res) => {
  const userSocialInfo = req.body;
  console.log("userSocialInfo", userSocialInfo);
  const userData = await getUserWithProviderKeyOrCreate(userSocialInfo);
  const userBasicData = {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    uniqueAlias: `${userData.providerKey}@${userData.providerType}`,
    userSmallImageUrl: userData.userSmallImageUrl
  };
  console.log("userData", userData);
  const userAccessToken = await issueTokenToData({
    data: userBasicData,
    secretKey: accessTokenSecret
  });

  const accessToken = userAccessToken.token;

  const cookieSetting = cookieHelper.getCookieSetting();
  res.cookie("AUTH_ACCESS_TOKEN", accessToken, cookieSetting);
  res.json(userBasicData);
});

export const logout = wrapperAsync(async (req, res) => {
  res.clearCookie("AUTH_ACCESS_TOKEN");
  res.json({ message: "cookie cleared!" });
});

export const whoAmI = (req, res) => {
  const { decoded } = req;
  res.json(decoded);
};
