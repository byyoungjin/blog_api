import jwt from "jsonwebtoken";
import R from "ramda";

import { Post, User } from "@/sequelize/models";

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

export const register = (req, res) => {
  const user = req.body;
  const { emailAddress } = user;
  //check User email
  const isItUniqueEmail = async user => {
    const foundUser = await User.findOne({
      where: { emailAddress: user.emailAddress }
    });
    if (foundUser) {
      return null;
    } else {
      return user;
    }
  };

  //assign User
  const createUser = async user => {
    if (user) {
      const maybeAdminUser = await assignAdminIfFirst(user);
      return User.createEncripted(maybeAdminUser);
    } else {
      throw new Error("Email exists");
    }
  };

  //response
  const respond = user => {
    res.json(user);
  };

  //handle eror
  const onError = error => {
    console.log("error.message", error.message);
    res.status(409).json({
      message: error.message
    });
  };

  isItUniqueEmail(user)
    .then(createUser)
    .then(respond)
    .catch(onError);
};

/**
 * POST /api/auth/login
 *{
     emailAddress,
     password
 } 
 *
 */
export const login = (req, res) => {
  const userInfo = req.body;

  const check = async userInfo => {
    const { emailAddress, password } = userInfo;
    const secret = req.app.get("jwt-token-secret");

    const user = await User.findOne({ where: { emailAddress } });
    if (user) {
      const isCorrectPassword = User.verify(password, user.password);
      if (isCorrectPassword) {
        const p = new Promise((resolve, reject) => {
          const userBasicData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress
          };
          jwt.sign(
            {
              //payload
              ...userBasicData,
              admin: user.admin
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
        return p;
      } else {
        throw new Error("Password not matching");
      }
    } else {
      throw new Error("Email not registered");
    }
  };

  const respond = userData => {
    res.json({
      message: "login successful",
      userData
    });
  };

  const onError = error => {
    console.log("error", error);
    res.status(403).json({
      message: error.message
    });
  };

  check(userInfo)
    .then(respond)
    .catch(onError);
};

export const check = (req, res) => {
  res.json({
    success: true,
    info: req.decoded
  });
};

const assignAdminIfFirst = async user => {
  const userCount = await User.count();
  const isAdmin = userCount ? false : true;
  return {
    ...user,
    admin: isAdmin
  };
};
