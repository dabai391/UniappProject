<template>
  <view class="adress" v-if="Address">
    <view class="adress" @tap="changeAddress" >
      <view >收货人：{{ Address?.receiver }} {{ Address?.contact }}</view>
      <view >地址：{{ Address?.fullLocation }} {{ Address?.address }}</view>
    </view>
  </view>
  <view v-else> 请先添加收货地址</view>
  <view class="goodsinfo" v-for="item in goods" :key="item.id">
    <view class="image">
      <image :src="item.picture" mode="scaleToFill" />
    </view>
    <view class="info">
      <view class="name">{{ item.name }}</view>
      <view class="spec">{{ item.attrsText }}</view>
      <view class="price">¥{{ item.price }}</view>
    </view>
    <view class="count">
      <view>X{{ item.count }}</view>
    </view>
  </view>
  <view class="time common">
    <text class="label">配送时间</text>
    <!-- #ifdef MP-WEIXIN -->
    <picker @change="bindDeliveryChange" class="picker" mode="selector" :range="deliveryList" range-key="text" >
      <view v-if="deliveryType">{{ deliveryList[deliveryType].text }}</view>
      <view  class="placeholder" v-else>请选择配送时间</view>
    </picker>
    <!-- #endif -->
  </view>
  <view class="remark common">
    <text class="label">备注</text>
    <input v-model="remark" placeholder="建议备注前与商家沟通确认" />
  </view>
  <view class="totalprice common">
    <text>商品总价</text>
    <text>¥{{ summary.totalPrice }}</text>
  </view>
 
  <view class="freight common">
    <text>运费</text>
    <text>¥{{ summary.postFee }}</text>
  </view>
  <view class="total">
    <view class="left">
      <view class="totalprice">合计：<text>¥{{ summary.totalPrice }}</text></view>
    </view>
    <view class="right">
      <button class="pay-btn"  @tap="submit">提交订单</button>
    </view>
  </view>
</template>
<script setup>
import { getOrderInfo,getNowOrderInfo, submitOrder } from "@/service/order.js";
import { onLoad } from "@dcloudio/uni-app";
import { ref,computed } from "vue";
import adressStore from '@/store/adressStore.js'
const query=defineProps({
  skuId: String,
  count: String
})
const adress = adressStore()
const goods=ref([])
const summary=ref({})
const userAddress=ref([])
const remark=ref('')
const getInfo=async ()=>{
  if(query.skuId && query.count){
    const res = await getNowOrderInfo({skuId:query.skuId,count:query.count})
    goods.value = res.result.goods
    summary.value = res.result.summary
    userAddress.value = res.result.userAddresses
  }else{
    const res = await getOrderInfo()
    goods.value = res.result.goods
    summary.value = res.result.summary
    userAddress.value = res.result.userAddresses
  }
  
}
onLoad( () => {
  getInfo()
})
const Address = computed(()=>{
  return  adress.addressList || userAddress.value?.find(item=>item.isDefault)
})
const changeAddress=()=>{
  uni.navigateTo({
    url: '/pagesMember/address/Address'
  })
}
const deliveryList = ref([
  { type: 1, text: '时间不限 (周一至周日)' },
  { type: 2, text: '工作日送 (周一至周五)' },
  { type: 3, text: '周末配送 (周六至周日)' },
])
const deliveryType = ref()
const bindDeliveryChange = (e) => {
  deliveryType.value = e.detail.value
}
//提交订单
const submit=async ()=>{
  if(!Address.value){
    uni.showToast({
      title: '请先添加收货地址',
      icon: 'none'
    })
    return
  }
  if(!deliveryType.value){
    uni.showToast({
      title: '请选择配送时间',
      icon: 'none'
    })
       return
  }
  if(!remark.value){
    uni.showToast({
      title: '请输入备注',
      icon: 'none'
    })
       return
  }
  const res = await submitOrder({
    goods:goods.value.map(item=>({
      skuId:item.skuId,
      count:item.count
    })),
    addressId:Address.value.id,
    deliveryTimeType:deliveryType.value,
    buyerMessage:remark.value,
    payType:1,
    payChannel:2
  })
  uni.navigateTo({
    url: '/pagesOrder/orderdetail/OrderDetail?orderId='+res.result.id
  })
}
</script>
<style>
page{
  background-color: #f5f5f5;
}
</style>
<style scoped lang="scss">
  .adress{
    width:100%;
    padding: 10rpx;
    background-color: #fff;
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #000;
    height: 100rpx;
  }
    .goodsinfo {
      background-color: #fff;
      width: 100%;
      padding: 20rpx;
      display: flex;
      gap: 30rpx;
      align-items: center;
      margin-top: 50rpx;
      margin-bottom: 30rpx;
      .image {
        image {
          width: 150rpx;
          height: 150rpx;
        }
      }
      .info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10rpx;
        .name {
            font-size: 28rpx;
            color: #333;
          }
        
          .spec {
            font-size: 24rpx;
            color: #999;
          }
        
          .price {
            font-size: 28rpx;
            color: #da3134;
          }
      }
     
  
      .count {
        margin-top: 90rpx;
      }
    }
    .common{
      background-color: #fff;
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid #f5f5f5;
    }
        .placeholder {
          font-size: 30rpx;
          color: #999;
        }
        .total {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          // height: 120rpx;
          display: flex;
          align-items: center;
          padding-left: 47rpx;
          padding-top: 15rpx;
          background-color: #fff;
          /* 关键代码：自动留出安全区距离 */
          padding-bottom: env(safe-area-inset-bottom);
          /* 兼容老设备 */
          padding-bottom: constant(safe-area-inset-bottom);
    
          .left {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 20rpx;
    
            .totalprice {
              font-size: 28rpx;
    
              text {
                color: #da3134;
              }
            }
          }
    
          .right {
            .pay-btn {
              width: 200rpx;
              height: 80rpx;
              font-size: 28rpx;
              color: #fff;
              background-color: #00c09d;
              border-radius: 40rpx;
              margin-bottom: 30rpx;
              margin-right: 100rpx;
            }
    
          }
        }
</style>
