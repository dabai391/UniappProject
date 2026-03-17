import { http } from "@/util/http.js";
export const getBannerList = (distributionSite=1) => {
  return http({
    url: "/home/banner",
    method: "GET",
    data: {
      distributionSite
    },
  });
}
export const getCategoryList = () => {
  return http({
    url: "/home/category/mutli",
    method: "GET",
  });
}
export const getHotList = () => {
  return http({
    url: "/home/hot/mutli",
    method: "GET",
  });
}