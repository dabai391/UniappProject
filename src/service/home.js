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