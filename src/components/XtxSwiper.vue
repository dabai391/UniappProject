<template>
  <view class="xtx-swiper">
    <swiper class="swiper" :interval="3000" :circular="true" @change="onChange">
      <swiper-item v-for="(item) in props.list" :key="item.id" class="swiper-item">
        <navigator url="" class="navigator">
          <image :src="item.imgUrl" mode="widthFix"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="swiper-indicators">
      <view v-for="(item, index) in props.list" :key="item.id" class="indicator"
        :class="{ 'active': activeIndex === index }">
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const activeIndex = ref(0)

const onChange = (event) => {
  activeIndex.value = event.detail.current
}
</script>
<style scoped lang="scss">
.xtx-swiper {
  width: 100%;
  position: relative;

  .swiper {
    .swiper-item {
      image {
        width: 100%;
      }
    }
  }

  .swiper-indicators {
    position: absolute;
    bottom: 20rpx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;

    .indicator {
      width: 36rpx;
      height: 10rpx;
      background-color: rgba(255, 255, 255, 0.4);
      margin: 0 10rpx;
      transition: all 0.3s ease-in-out;
      &.active {
        background-color: #fff;
      }
    }
  }
}
</style>
