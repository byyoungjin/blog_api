import jwt from "jsonwebtoken";
import { encrypt } from "@/helper";

import { Post, User, UserTraditional, UserSocial } from "@/sequelize/models";

export const checkUniqueEmail = async emailAddress => {
  const foundUser = await UserTraditional.findOne({
    where: { emailAddress }
  });
  if (foundUser) {
    const error = new Error("이미 등록된 이메일이에요.");
    error.status = 409;
    console.log("error", error);
    throw error;
  }
};

export const getUserWithEmail = async emailAddress => {
  const userTraditionalObj = await UserTraditional.findOne({
    where: { emailAddress }
  });
  if (!userTraditionalObj) {
    const error = new Error("등록된 이메일이 아니에요.");
    error.status = 409;
    console.log("error", error);
    throw error;
  }
  const userTraditionalData = userTraditionalObj.dataValues;
  const { userId } = userTraditionalData;
  const userObj = await User.findByPk(userId);
  const userData = userObj.dataValues;
  return { ...userData, ...userTraditionalData };
};

export const getUserWithProviderKeyOrCreate = async userSocialInfo => {
  const { providerKey, providerType } = userSocialInfo;
  const userSocialObj = await UserSocial.findOne({
    where: { providerKey, providerType }
  });
  let userSocialData;
  if (!userSocialObj) {
    userSocialData = await createUserAndUserSocial(userSocialInfo);
  } else {
    userSocialData = userSocialObj.dataValues;
  }

  const { userId } = userSocialData;
  const userObj = await User.findByPk(userId);
  const userData = userObj.dataValues;
  return { ...userData, ...userSocialData };
};

export const checkUserPassword = ({ password, encryptedPassword }) => {
  const isCorrectPassword = User.verify({ password, encryptedPassword });
  if (!isCorrectPassword) {
    const error = new Error("비밀번호가 틀렸습니다. 다시입력해주세요.");
    error.status = 409;
    console.log("error", error);
    throw error;
  }
};

export const issueTokenToData = ({ data, secretKey, expiresIn }) => {
  const options = {
    issuer: "youngjin-ha",
    subject: "userInfo"
  };
  if (expiresIn) {
    options.expiresIn = expiresIn;
  }
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        //payload
        ...data
      },
      secretKey,
      options,
      (error, token) => {
        if (error) reject(error);
        resolve({ ...data, token });
      }
    );
  });
};

export const createUserAndUserTraditional = async user => {
  const { password, emailAddress } = user;
  const encriptedPassword = encrypt(password);
  const createdUserObj = await User.create({
    ...user
  });

  const { id } = createdUserObj.dataValues;

  await UserTraditional.create({
    userId: id,
    emailAddress,
    password: encriptedPassword
  });

  return createdUserObj.dataValues;
};

export const createUserAndUserSocial = async userSocialInfo => {
  const { providerType, providerKey } = userSocialInfo;

  const createdUserObj = await User.create({
    ...userSocialInfo
  });

  const { id } = createdUserObj.dataValues;

  const createdUserSocailObj = await UserSocial.create({
    userId: id,
    providerKey,
    providerType
  });

  return createdUserSocailObj.dataValues;
};
