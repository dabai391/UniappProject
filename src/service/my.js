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
//获取地址列表
export const getAddressList = () => {
  return http({
    url: "/member/address",
    method: "get",
  });
}
//添加地址
export const addAddress = (data) => {
  return http({
    url: "/member/address",
    method: "post",
    data,
  });
}
//获取地址详情
export const getAddressDetail = (id) => {
  return http({
    url: `/member/address/${id}`,
    method: "get",
  });
}
//修改地址
export const updateAddress = (id, data) => {
  return http({
    url: `/member/address/${id}`,
    method: "put",
    data,
  });
}
//删除地址
export const deleteAddress = (id) => {
  return http({
    url: `/member/address/${id}`,
    method: "delete",
  });
}
