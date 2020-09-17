export class CookieHelper {
  env = process.env.NODE_ENV || "development";

  getCookieSetting(isAutoLogin) {
    const cookieSettings = {
      production: {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        expires: isAutoLogin ? addYears(new Date(), 3) : 0
      },
      //WARNING: there is no samesite=NONE in safari it applied as Strict
      staged: {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: isAutoLogin ? addYears(new Date(), 3) : 0
      },
      development: {
        httpOnly: true,
        secure: false,
        expires: isAutoLogin ? addYears(new Date(), 3) : 0
      }
    };

    return cookieSettings[this.env];
  }
}
