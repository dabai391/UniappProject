<template>
 <CustomNavbar/>
 <XtxSwiper :list="bannerlist"/>
</template>
<script setup>
import useUserStore  from "@/store/index.js"
import CustomNavbar from "./components/CustomNavbar.vue";
import { getBannerList } from "@/service/home.js"
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue"
const userStore = useUserStore()
const bannerlist=ref([])
const getBanner=async()=>{
  const res=await getBannerList()
  bannerlist.value=res.result
}
onLoad(()=>{
  getBanner()
})
</script>
<style scoped >

</style>