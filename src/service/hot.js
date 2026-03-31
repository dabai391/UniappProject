import { http } from "@/util/http.js";
//url:请求地址,data:请求参数(可选)
export const getHot = (url,data={}) => {
  return http({
    url,
    method: "GET",
    data
  });
}
