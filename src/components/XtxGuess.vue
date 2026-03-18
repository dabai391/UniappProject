<template>
  <view class="xtu-guess">
    <view class="title">
      <text>猜你喜欢</text>
    </view>
    <view class="guess-list">
      <view class="guess-item" v-for="item in guesslist" :key="item.id">
        <view class="image">
          <image :src="item.picture" mode="aspectFill"></image>
        </view>
        <view class="name">{{ item.name }}</view>
        <view class="price">￥{{ item.price }}</view>
      </view>
    </view>
    <view class="no-more" v-if="isshow">
      <text @click="getMore">没有更多了</text>
    </view>
  </view>
</template>
<script setup>
import { getGuessList } from "@/service/home.js"
// import { onLoad } from "@dcloudio/uni-app";
import { ref, onMounted, watch } from "vue"
const isshow = ref(false)
const pageParams = {
  page: 1,
  pageSize: 10
}
const total = ref(0)
const guesslist = ref([])
const loading = ref(false)
const getGuess = async (params) => {
  const res = await getGuessList(params)
  // 如果是第一页，直接替换数据，否则累加
  if (params.page === 1) {
    guesslist.value = res.result.items
  } else {
    guesslist.value = [...guesslist.value, ...res.result.items]
  }
  total.value = res.result.counts
}
// 防抖函数
const debounce = (func, delay) => {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}
// 节流函数
const throttle = (func, delay) => {
  let lastTime = 0
  return function () {
    const nowTime = Date.now()
    if (nowTime - lastTime >= delay) {
      func.apply(this, arguments)
      lastTime = nowTime
    }
  }
}
const getMore = throttle(async () => {
  if (loading.value) return
  if (pageParams.page * pageParams.pageSize >= total.value) {
    return isshow.value = true, uni.showToast({
      title: '没有更多了',
      icon: 'none'
    })
  }
  loading.value = true
  pageParams.page++
  try {
    await getGuess(pageParams)
  } catch (error) {
    console.error('加载更多失败:', error)
  } finally {
    loading.value = false
  }
}, 1000)
onMounted(() => {
  getGuess(pageParams)
})
const resetData = () => {
  guesslist.value = [],
    isshow.value = false,
    pageParams.page = 1
}
defineExpose({
  getMore,
  getGuess,
  resetData
})
</script>
<style scoped lang="scss">
.xtu-guess {
  width: 100%;
  padding: 0 20rpx;
  box-sizing: border-box;

  .guess-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .guess-item {
      width: 48%;
      margin-bottom: 20rpx;
      background-color: #fff;
      padding: 20rpx;
      border-radius: 20rpx;
      box-sizing: border-box;
      box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

      image {
        width: 100%;
        height: 280rpx;
      }

      .name {
        font-size: 32rpx;
        color: #333;
      }

      .price {
        font-size: 30rpx;
        color: #ff4444;
      }
    }
  }

  .no-more {
    width: 100%;
    text-align: center;
    font-size: 34rpx;
    color: #999;
  }
}
</style>