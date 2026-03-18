<template>
  <div class="container">
    <view class="header">
      <image src="../../../static/images/logo.png" mode="widthFix"></image>
     <text class="logo-text">新鲜 · 亲民 · 快捷</text>
    </view>
    <view class="search">
      <input type="text" placeholder="请输入搜索内容" placeholder-class="placeholder-style">
    </view>
  </div>

</template>
<script setup>

</script>
<style scoped lang="scss">
.container {
  background-color: #00c09d;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .header {
    padding-top: 100rpx;
    padding-left: 30rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;

    image {
      width: 170rpx;
      position: relative;
    }

    text {
      font-size: 30rpx;
      color: #fff;
    }
  }

  .search {
    padding-top: 30rpx;
    padding-left: 30rpx;
    padding-bottom: 30rpx;

    input {
      width: 650rpx;
      height: 70rpx;
      border-radius: 40rpx;
      font-size: 30rpx;
      border: 1px solid #cfcccc;
      padding-left: 50rpx;
    }   
  }
}
</style>