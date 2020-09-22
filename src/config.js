import dotenv from "dotenv";

dotenv.config();

export default {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET_KEY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET_KEY,
  encryptPasswordScret: process.env.ENCRYPT_PASSWORD_SECRET_KEY
};

export const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  scretAccessKey: process.env.AWS_SECRET_ACCESSS_KEY,
  bucketName: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_REGION
};

export const unSplashConfig = {
  accessKey: process.env.UNSPLASH_ACCESS_KEY
};
