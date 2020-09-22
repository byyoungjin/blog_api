import Unsplash, { toJson } from "unsplash-js";
import fetch from "node-fetch";
global.fetch = fetch;

import { wrapperAsync } from "@/helper";
import { unSplashConfig } from "@/config";

const staticRes = [
  {
    thumbImageSrc:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    regularImageSrc:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    userProfile: "https://unsplash.com/@jaehunpark",
    userName: "Jae Park"
  },
  {
    thumbImageSrc:
      "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    regularImageSrc:
      "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    userProfile: "https://unsplash.com/@calypso999",
    userName: "Raul Varzar"
  },
  {
    thumbImageSrc:
      "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    regularImageSrc:
      "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    userProfile: "https://unsplash.com/@izandphil",
    userName: "Iz & Phil"
  },
  {
    thumbImageSrc:
      "https://images.unsplash.com/photo-1570824104453-508955ab713e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    regularImageSrc:
      "https://images.unsplash.com/photo-1570824104453-508955ab713e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    userProfile: "https://unsplash.com/@theluckyneko",
    userName: "The Lucky Neko"
  },
  {
    thumbImageSrc:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    regularImageSrc:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    userProfile: "https://unsplash.com/@kstonematheson",
    userName: "Kate Stone Matheson"
  },
  {
    thumbImageSrc:
      "https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    regularImageSrc:
      "https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    userProfile: "https://unsplash.com/@tranmautritam",
    userName: "Tran Mau Tri Tam"
  },
  {
    thumbImageSrc:
      "https://images.unsplash.com/photo-1568995430555-091fd9226ed3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    regularImageSrc:
      "https://images.unsplash.com/photo-1568995430555-091fd9226ed3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    userProfile: "https://unsplash.com/@centelm",
    userName: "Clément Falize"
  },
  {
    thumbImageSrc:
      "https://images.unsplash.com/photo-1548546738-8509cb246ed3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    regularImageSrc:
      "https://images.unsplash.com/photo-1548546738-8509cb246ed3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    userProfile: "https://unsplash.com/@lloyddirks",
    userName: "Lloyd Dirks"
  },
  {
    thumbImageSrc:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    regularImageSrc:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMDMzMH0",
    userProfile: "https://unsplash.com/@ejleusink",
    userName: "Erik-Jan Leusink"
  }
];

export const getPhotos = wrapperAsync(async (req, res, next) => {
  const { keyword } = req.body;
  const unsplash = new Unsplash({
    accessKey: unSplashConfig.accessKey
  });
  const unsplashRes = await unsplash.search.photos(keyword, 1, 9);
  const unsplashResJson = await toJson(unsplashRes);

  const filterdResult = unsplashResJson.results.map(result => ({
    thumbImageSrc: result.urls.thumb,
    regularImageSrc: result.urls.regular,
    userProfile: result.user.links.html,
    userName: result.user.name
  }));

  res.json(filterdResult);
});
