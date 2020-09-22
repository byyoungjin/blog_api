import crypto from "crypto";
import config from "@/config";

//general encrypt function
export const encrypt = password => {
  return crypto
    .createHmac("sha1", config.encryptPasswordScret)
    .update(password)
    .digest("base64");
};

//wraaper for errorhandling in router
export const wrapperAsync = fn => {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
};
