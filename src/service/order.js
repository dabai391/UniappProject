import { http } from "@/util/http.js";
//获取订单信息
export const getOrderInfo = () => {
  return http({
    url: "/member/order/pre",
    method: "get",
  });
}
//获取立即购买的订单信息
export const getNowOrderInfo = (data) => {
  return http({
    url: "/member/order/pre/now",
    method: "get",
    data
  });
}
//提交订单
export const submitOrder = (data) => {
  return http({
    url: "/member/order",
    method: "post",
    data
  });
}
//获取订单详情
export const getOrderDetail = (id) => {
  return http({
    url: `/member/order/${id}`,
    method: "get",
  });
}
//订单支付
export const payOrder = (data) => {
  return http({
    url: "/pay/mock",
    method: "get",
    data  
  });
}
//模拟发货
export const deliveryOrder = (id) => {
  return http({
    url: `/member/order/consignment/${id}`,
    method: "get",
  });
}
//确认收货
export const confirmOrder = (id) => {
  return http({
    url: `/member/order/${id}/receipt`,
    method: "put",
  })
}
//获取订单物流
export const getOrderLogistics = (id) => {
  return http({
    url: `/member/order/${id}/logistics`,
    method: "get",
  });
}
//删除订单
export const deleteOrder = (data) => {
  return http({
    url: "/member/order",
    method: "delete",
    data,
  });
}
//获取订单列表
export const getOrderList = (data) => {
  return http({
    url: "/member/order",
    method: "get",
    data,
  });
}
