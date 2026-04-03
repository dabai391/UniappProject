import { http } from "@/util/http.js";
export const getLogin = ({phoneNumber}) => {
  return http({
    url: "/login/wxMin/simple",
    method: "post",
    data: {
      phoneNumber,
    },
  });
}
export const getProfile = () => {
  return http({
    url: "/member/profile",
    method: "get",
  });
}
//修改用户信息
export const updateProfile = (data) => {
  return http({
    url: "/member/profile",
    method: "put",
    data,
  });
}
