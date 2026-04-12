<template>
    <view class="order-list">
      <view class="state">
        <text v-for="item, index in orderState" :key="item.id" @tap="changeIndex(index)" class="state-item"
          :class="{ 'active': activeIndex === index }">{{ item.name
          }}</text>
      </view>
      <!-- <swiper :current="activeIndex" @change="activeIndex = $event.detail.current">
        <swiper-item v-for="item in orderState" :key="item.id">
        <List></List>
      </swiper-item>
      </swiper> -->
      <scroll-view scroll-y class="scroll-view">
        <List :state="State || props.state"></List>
      </scroll-view>
    </view>
</template>
<script setup>
import { ref } from 'vue'
import List from './list.vue'
const props = defineProps({
  state: {
    type: Number,
    default: 0
  }
})
const orderState = ref([
  { id: 0, name: '全部' },
  { id: 1, name: '待付款' },
  { id: 2, name: '待发货' },
  { id: 3, name: '待收货' },
  { id: 4, name: '待评价' },
  { id: 5, name: '已完成' },
  { id: 6, name: '已取消' }
])
const State = ref(0)
const activeIndex = ref(0 || props.state)
const changeIndex = (index) => {
  // 直接更新状态，避免多次渲染
  activeIndex.value = index
  State.value = index
}

</script>
<style scoped lang="scss">
.scroll-view {
  height: 100vh;
  overflow: hidden;
}

.order-list {
  width: 100%;
  background-color: #f5f5f5;

  .state {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    position: relative;
  }
  .state-item {
    flex: 1;
    text-align: center;
    padding: 10rpx 0;
  }

  .active {
    border-bottom: 5rpx solid #27ba9b;
    transition: border-bottom 0.3s ease;
  }
  
  .state-item {
    transition: all 0.3s ease;
  }
}
</style>
