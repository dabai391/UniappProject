<template>
  <view class="hot-panel">
    <view class="hot-item" v-for="(item) in props.list" :key="item.id">
      <view class="title">{{ item.title }}<text>{{ item.alt }}</text></view>
      <view class="image" >
        <image v-for="i in item.pictures " :src="i" :key="i"></image>
      </view>
    </view>
  </view>
</template>
<script setup>
const props=defineProps({
  list:Array
})
</script>
<style scoped lang="scss">
.hot-panel{
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 25rpx;
  margin-left: 40rpx;
  .hot-item{
    width: 48%;
    margin-top: 20rpx;
    .image{
      display: flex;
      align-items: center;
      margin-top: 20rpx;
      gap:20rpx;
      image {
          width: 150rpx;
          height: 150rpx;
        }
    }
    
    .title{
      font-size: 35rpx;
      color: #000;
      text{
        font-size: 25rpx;
        color: #a7a4a4;
        margin-left: 20rpx;
      }
    }
  }
}
</style>