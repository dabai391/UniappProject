<template>
 <CustomNavbar/>
 <XtxSwiper :list="bannerlist"/>
 <CategoryPanel :list="categorylist"/>
 <HotPanel :list="hotlist"/>
</template>
<script setup>
import CustomNavbar from "./components/CustomNavbar.vue";
import { getBannerList, getCategoryList, getHotList } from "@/service/home.js"
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue"
import CategoryPanel from "./components/CategoryPanel.vue"
import HotPanel from "./components/HotPanel.vue"
const bannerlist=ref([])
const getBanner=async()=>{
  const res=await getBannerList()
  bannerlist.value=res.result
}
const categorylist=ref([])
const getCategory=async()=>{
  const res=await getCategoryList()
  categorylist.value=res.result
}
const hotlist=ref([])
const getHot=async()=>{
  const res=await getHotList()
  hotlist.value=res.result
}
onLoad(()=>{
  getBanner(),
  getCategory(),
  getHot()
})
</script>
<style scoped lang="scss" >
page{
  background-color: #aaa8a8;
}
</style>