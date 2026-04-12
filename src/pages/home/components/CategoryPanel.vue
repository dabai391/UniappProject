<template>
  <view class="category-panel">
    <view class="category-item" v-for="(item) in props.list" :key="item.id" @tap="goCate(item)">
      <image :src="item.icon" ></image>
      <view class="category-item-text">{{item.name}}</view>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const goCate=(item)=>{
  uni.navigateTo({
    url: "/pages/cate/cateMain?id=" + item.id
  })
}
</script>
<style scoped lang="scss">
.category-panel{
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .category-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 120rpx;
    margin-top: 20rpx;
    image{
      width: 80rpx;
      height: 80rpx;
    }
    .category-item-text{
      font-size: 30rpx;
      color: #a7a4a4;
    }
  }
}
</style>