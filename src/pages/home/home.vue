<template>
  <CustomNavbar />
  <HomeSkeleton v-if="isLoading" />
  <scroll-view scroll-y class="scroll" style="margin-top: 270rpx;" @scrolltolower="getMore" refresher-enabled
    @refresherrefresh="refresh" :refresher-triggered="isTriggered" v-else>
    <XtxSwiper :list="bannerlist" />
    <CategoryPanel :list="categorylist" />
    <HotPanel :list="hotlist" />
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>
<script setup>
import CustomNavbar from "./components/CustomNavbar.vue";
import { getBannerList, getCategoryList, getHotList } from "@/service/home.js"
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue"
import CategoryPanel from "./components/CategoryPanel.vue"
import HotPanel from "./components/HotPanel.vue"
import HomeSkeleton from "./components/HomeSkeleton.vue"
const bannerlist = ref([])
const getBanner = async () => {
  const res = await getBannerList()
  bannerlist.value = res.result
}
const categorylist = ref([])
const getCategory = async () => {
  const res = await getCategoryList()
  categorylist.value = res.result
}
const hotlist = ref([])
const getHot = async () => {
  const res = await getHotList()
  hotlist.value = res.result
}
const isLoading = ref(true)
onLoad(async () => {
  await Promise.all([
    getBanner(),
    getCategory(),
    getHot()
  ])
  isLoading.value = false
})
const guessRef = ref()
const getMore = () => {
  guessRef.value?.getMore()
}
//是否处于下拉刷新状态
const isTriggered = ref(false)
const refresh = async () => {
  isTriggered.value = true
  // 重置猜你喜欢组件的数据
  guessRef.value?.resetData()
  await Promise.all([
    getBanner(),
    getCategory(),
    getHot(),
    guessRef.value?.getGuess({page:1,pageSize:10})
  ])
  // 刷新完成后，重置下拉刷新状态
  isTriggered.value = false
}
</script>
<style scoped lang="scss">
page {
  background-color: #aaa8a8;
  height: 100%;
}

.scroll {
  height: 100vh;
}
</style>