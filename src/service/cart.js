import { http } from "@/util/http.js";
export const getCartList = () => {
  return http({
    url: "/member/cart",
    method: "get",
  });
}
//删除购物车商品
export const deleteCart = (data) => {
  return http({
    url: "/member/cart",
    method: "delete",
    data
  });
}
//添加购物车
export const addCartList = (data) => {
  return http({
    url: "/member/cart",
    method: "post",
    data,
  });
}
//商品数量修改
export const updateGoodsCount = (skuId,data) => {
  return http({
    url: `/member/cart/${skuId}`,
    method: "put",
    data,
  });
}
//购物车全选/取消全选
export const updateCartSelected = (data) => {
  return http({
    url: "/member/cart/selected",
    method: "put",
    data,
  });
}