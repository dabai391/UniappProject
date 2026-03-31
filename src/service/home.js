import { http } from "@/util/http.js";
export const getBannerList = () => {
  return http({
    url: "/home/banner",
    method: "GET",
    data: {
      distributionSite: 1
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
export const getGuessList = ({page=1,pageSize=10}) => {
  return http({
    url: "/home/goods/guessLike",
    method: "GET",
    data:{
      page,
      pageSize
    }
  });
}