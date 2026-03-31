import { http } from "@/util/http.js";
export const getCategoryTop = () => {
  return http({
    url: "/category/top",
    method: "GET",
  });
};
export const getGoodsDetail = (id) => {
  return http({
    url: '/goods',
    method: "GET",
    data:{
      id
    }
  });
};