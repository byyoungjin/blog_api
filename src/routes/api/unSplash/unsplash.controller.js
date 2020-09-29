import Unsplash, { toJson } from "unsplash-js";
import fetch from "node-fetch";
global.fetch = fetch;

import { wrapperAsync } from "@/helper";
import { unSplashConfig } from "@/config";

export const getPhotos = wrapperAsync(async (req, res, next) => {
  const { keyword, currentPage } = req.body;
  const unsplash = new Unsplash({
    accessKey: unSplashConfig.accessKey
  });
  const unsplashRes = await unsplash.search.photos(keyword, currentPage, 9);
  const unsplashResJson = await toJson(unsplashRes);

  const filterdResult = unsplashResJson.results.map(result => ({
    thumbImageSrc: result.urls.thumb,
    regularImageSrc: result.urls.regular,
    userProfile: result.user.links.html,
    userName: result.user.name,
    imageHeight: result.height,
    imageWidth: result.width
  }));

  const totalImageNumber = unsplashResJson.total;
  const totalPages = unsplashResJson.total_pages;

  res.json({ filterdResult, totalImageNumber, totalPages });
});
