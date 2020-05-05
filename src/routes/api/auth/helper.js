import jwt from "jsonwebtoken";

import { Post, User } from "@/sequelize/models";
import config from "@/config";

const { secret } = config;

export const checkUniqueEmail = async emailAddress => {
  const foundUser = await User.findOne({
    where: { emailAddress }
  });
  if (foundUser) {
    const error = new Error("Email exist!");
    error.status = 409;
    console.log("error", error);
    throw error;
  }
};

export const checkRegisteredEmail = async emailAddress => {
  const foundUser = await User.findOne({
    where: { emailAddress }
  });
  if (!foundUser) {
    const error = new Error("Email not registered!");
    error.status = 409;
    console.log("error", error);
    throw error;
  }
  return foundUser;
};

export const checkUserPassword = ({ password, encryptedPassword }) => {
  const isCorrectPassword = User.verify({ password, encryptedPassword });
  if (!isCorrectPassword) {
    const error = new Error("Password not matching");
    error.status = 409;
    console.log("error", error);
    throw error;
  }
};

export const issueTokenToUser = user => {
  return new Promise((resolve, reject) => {
    const userBasicData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    };
    jwt.sign(
      {
        //payload
        ...userBasicData
      },
      secret,
      {
        //options
        expiresIn: "7d",
        issuer: "youngjin-ha",
        subject: "userInfo"
      },
      (error, token) => {
        if (error) reject(error);
        resolve({ ...userBasicData, token });
      }
    );
  });
};
