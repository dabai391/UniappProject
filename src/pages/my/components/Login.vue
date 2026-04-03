<template>
  <view class="login">
    <view class="logo">
      <image src="/static/images/logo_icon.png"></image>
    </view>
    <button type="button">手机号快捷登录</button>
    <view class="text">
      <view>————其他登录方式————</view>
    </view>
    <view class="other" @tap="handleLogin">
      <image src="/static/my-icons/icon1.png"></image>
      <view>模拟快捷登录</view>
    </view>
    <view>
      <!-- 输入框示例 -->
      <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog ref="inputClose" mode="input" title="请输入电话号码" :model-value="phoneNumber" placeholder="请输入电话号码"
          :before-close="true" @confirm="dialogInputConfirm" @close="handleClose"
          @update:model-value="(val) => phoneNumber = val"></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>
<script setup>
import { getLogin } from '@/service/my.js'
import { ref } from 'vue'
import useUserStore from '@/store/userStore.js'
const phoneNumber = ref('')
const userStore = useUserStore()
const inputDialog = ref()

const handleLogin = () => {
  phoneNumber.value = ''
  inputDialog.value?.open()
}
const dialogInputConfirm = async (e) => {
  phoneNumber.value = e
  //使用正则表达式验证电话号码
  if (!/^1[3456789]\d{9}$/.test(phoneNumber.value)) {
    uni.showToast({
      title: '请输入正确的电话号码',
      icon: 'none'
    })
    //验证失败，弹框继续显示，清空输入框内容
    setTimeout(() => {
      phoneNumber.value = ''
    }, 500)
    return false
  } else {
    const res = await getLogin({ phoneNumber: phoneNumber.value })
    userStore.getUserinfo(res.result)
    uni.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 3000
    })
    //登录成功后，关闭弹窗
    inputDialog.value?.close()
    //跳转到我的页面，我的页面为tabbar页面，应使用switchTab方法
    uni.switchTab({
      url: '/pages/my/my'
    })
  }
}
const handleClose = () => {
  phoneNumber.value = '',
  inputDialog.value?.close()
}
</script>
<style scoped lang="scss">
.login {
  height: 100vh;
  width: 100%;

  .logo {
    width: 100%;
    margin: 200rpx auto;
    text-align: center;

    image {
      width: 200rpx;
      height: 200rpx;
    }
  }

  button {
    width: 90%;
    height: 100rpx;
    margin: 20rpx auto;
    background-color: #00cca7;
    font-size: 36rpx;
    color: #fff;
    border-radius: 50rpx;
  }

  .text {
    font-size: 36rpx;
    color: #7c7b7b;
    text-align: center;
    margin: 40rpx auto;
  }

  .other {
    font-size: 36rpx;
    color: #7c7b7b;
    text-align: center;
    margin: 0rpx auto;

    image {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
  }
}
</style>
