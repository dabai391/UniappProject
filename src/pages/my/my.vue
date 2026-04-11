<template>
  <scroll-view scroll-y @scrolltolower="getMore" class="scroll-view">
    <view class="nav-header">
      <view class="text">
        <view class="avtor">
          <image :src="userStore.userInfo?.avatar || '/static/images/car.png'"></image>
        </view>
          <view class="info" v-if="userStore.userInfo.token">
          <view class="name">{{ userStore.userInfo.nickname }}</view>
          <view class="updateinfo" @tap="handleUserInfo">更改用户信息</view>
        </view>
        <view class="info" v-else>
          <navigator
            url="/pages/my/components/Login"
            open-type="navigate"
            hover-class="navigator-hover"
          >
            <view class="name">请登录</view>
          </navigator>
        </view>
      </view>
      <view class="setting" @tap="handleSetting">设置</view>
    </view>
    <view class="my-order">
      <view class="title">我的订单 <text>查看全部订单</text></view>
      <view class="tab">
        <view v-for="item,index in orderTabs" :key="item.id">
          <navigator :url="`/pagesOrder/orderlist/OrderList?state=${index+1}`"  open-type="navigate" hover-class="navigator-hover" class="orderitem" >
            <image :src="item.icon"></image>
            {{ item.name }}
          </navigator>
        </view>
      </view>
    </view>
    <XtxGuess ref="guessRef" />
  </scroll-view>

</template>
<script setup>
import { ref } from 'vue'
import useUserStore from '@/store/userStore.js'
const orderTabs = ref([
  { name: '待付款', id: 1, icon: '/static/my-icons/icon1.png' },
  { name: '待发货', id: 2, icon: '/static/my-icons/icon2.png' },
  { name: '待收货', id: 3, icon: '/static/my-icons/icon3.png' },
  { name: '待评价', id: 4, icon: '/static/my-icons/icon4.png' },
  { name: '售后', id: 5, icon: '/static/my-icons/icon5.png' }
])
const guessRef = ref()
const getMore = () => {
  guessRef.value?.getMore()
}
const userStore = useUserStore()

const handleSetting = () => {
  uni.navigateTo({
    url: '/pagesMember/settings/Setting'
  })
}
const handleUserInfo = () => {
  uni.navigateTo({
    url: '/pagesMember/userinfo/UserInfo'
  })
}


</script>
<style lang="scss">
page {
  background-color: #f7f7f9;
}
</style>

<style scoped lang="scss">
.scroll-view {
  height: 100vh;
  overflow: hidden;
}

.nav-header {
  width: 100%;
  height: 200rpx;
  display: flex;
  align-items: center;
//  justify-content: space-between;
  padding-top: 100rpx;
  background-color: #00cca7;
  font-size: 36rpx;
  color: #fff;
  gap:259rpx;
  padding-left: 20rpx;
  .text {
    display: flex;
    align-items: center;
    gap: 30rpx;
    .avtor {
      image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20rpx;
      .name{
        font-size: 36rpx;
        color: #fff;
      }
      .updateinfo{
        font-size: 26rpx;
        width: 200rpx;
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        border-radius: 20rpx;
        border: 1px solid #fff;
        color: #fff;
      }
    }
  }
}

.my-order {
  width: 100%;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  padding-bottom: 50rpx;

  .title {
    font-size: 36rpx;
    color: #333;
    padding: 30rpx 0;
    position: relative;

    text {
      font-size: 26rpx;
      color: #7c7b7b;
      position: absolute;
      right: 30rpx;
    }
  }

  .tab {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .orderitem {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10rpx;

      image {
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
}
</style>