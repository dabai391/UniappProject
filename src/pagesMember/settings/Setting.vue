<template>
  <view class="setting">
    <view class="address" v-if="userStore.userInfo.token">我的收货地址</view>
    <view class="connect">
      <view>授权管理</view>
      <view>问题管理</view>
      <view>联系我们</view>
    </view>
    <view class="about">关于我们</view>
    <view class="logout" @tap="handleLogout" v-if="userStore.userInfo.token">退出登录</view>
  </view>

</template>
<script setup>
// import { ref } from 'vue'
import useUserStore from '@/store/userStore.js'
const userStore = useUserStore()

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success: function (res) {
      if (res.confirm) {
        userStore.clearUserinfo()
        uni.showToast({
          title: '退出登录成功',
          icon: 'none'
        })
        //退出登录成功后，跳转到登录页面
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/my/my'
          })
        }, 2000)
      } else if (res.cancel) {
        uni.showToast({
          title: '退出登录取消',
          icon: 'none'
        })
      }
    }
  });
  
}
</script>
<style>
page {
  background-color: #f4f4f4;
}
</style>
<style scoped lang="scss">
.setting {
  height: 100vh;
  width: 100%;
  font-size: 36rpx;
  color: #000;
  padding: 40rpx 10rpx;
  box-sizing: border-box;
  .address,
  .connect,
  .about,
  .logout {
    width: 100%;
    line-height: 100rpx;
    background-color: #fff;
    margin-bottom: 40rpx;
    padding-left: 30rpx;
    border-radius: 10rpx;
  }

  .logout {
    text-align: center;
  }

  .connect {
    &>view:not(:last-child) {
      border-bottom: 1rpx solid #ccc;
    }
  }
}
</style>
