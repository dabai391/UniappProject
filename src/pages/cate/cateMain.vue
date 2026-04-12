<template>
  <CateSkeleton v-if="isLoading" />
  <view class="container" v-else>
    <view class="input"><input type="text" placeholder="女鞋"></view>
    <view class="main">
      <scroll-view scroll-y class="leftscroll">
        <view class="item" v-for="(item, index) in categorylist" :key="item.id" @tap="updateCurIndex(index)"
          :class="{ 'active': curIndex === index }">
          <view>{{ item.name }}</view>
        </view>
      </scroll-view>
      <view class="mian-right">
        <scroll-view scroll-y class="rghitscroll">
          <XtxSwiper :list="bannerlist" />
          <view class="subcategory" v-for="item in categorylist[curIndex]?.children" :key="item.id">
            <text class="title">{{ item.name }}</text>
            <text class="more">全部</text>
            <view class="goodslist">
              <navigator v-for="i in item.goods" :key="i.id" :url="`/pages/cate/components/GoodsDetail?id=${i.id}`"
                class="goods" >
                <image class="image" :src="i.picture" mode="widthFill"></image>
                <view class="name">{{ i.name }}</view>
                <view class="price">￥{{ i.price }}</view>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>

</template>
<script setup>
import { getBannerList } from "@/service/home.js"
import { getCategoryTop } from "@/service/category.js"
import { ref} from "vue"
import { onLoad  } from "@dcloudio/uni-app"
import CateSkeleton from "./components/CateSkeleton.vue"
const props=defineProps({
  id: {
    type: String,
    default: ""
  }
})

const bannerlist = ref([])
const getBanner = async () => {
  const res = await getBannerList({ distributionSite: 2 })
  bannerlist.value = res.result
}
const categorylist = ref([])
const getCategory = async () => {
  const res = await getCategoryTop()
  categorylist.value = res.result
}
const curIndex=ref(0)
const updateCurIndex=(index)=>{
  curIndex.value = index
}
const isLoading = ref(true)
onLoad(async () => {
  uni.setNavigationBarTitle({
    title: '商品分类'
  })
  uni.setNavigationBarColor({
    frontColor: '#000000',  // 文字颜色
    backgroundColor: '#ffffff',  // 背景颜色
    animation: {
      duration: 400,
      timingFunc: 'easeInOut'
    }
  })
  await Promise.all([
    getBanner(),
    getCategory()
  ])
  if(props.id){
    curIndex.value=categorylist.value.findIndex(item=>item.id===props.id) || 0
  }
  isLoading.value = false
})

</script>
<style  lang="scss">
.input {
  margin-left: 30rpx;

  input {
    width: 80%;
    height: 80rpx;
    border-radius: 40rpx;
    padding: 0 70rpx;
    border: 0.5rpx solid #ccc;
    outline: none;
  }
}

.main {
  margin-top: 50rpx;
  display: flex;
  height: calc(100vh - 150rpx);

  .leftscroll {
    // 左侧滚动条
    flex: 1;
    height: 100%;
    background-color: #f8f8f8;

    .item {
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      font-size: 30rpx;
      color: #333;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      transition: all 0.5s ease-in-out;
    }

    .active {
      background-color: #efeeee;
    }
  }

  .mian-right {
    flex: 3;
    height: 100%;
    margin-left: 30rpx;
    display: flex;
    flex-direction: column;

    .rghitscroll {
      overflow: hidden;
    }

    .subcategory {
      margin-bottom: 30rpx;
      position: relative;

      .title {
        font-size: 36rpx;
        color: #333;
      }

      .more {
        font-size: 26rpx;
        color: #7c7b7b;
        position: absolute;
        right: 30rpx;
      }

      .goodslist {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 0 10rpx;

        .goods {
          width: calc(33.33% - 20rpx);
          margin: 10rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background-color: #fff;
          border-radius: 10rpx;
          padding: 15rpx;
          box-sizing: border-box;

          .image {
            width: 100%;
            height: 160rpx;
            border-radius: 10rpx;
          }

          .name {
            margin-top: 10rpx;
            font-size: 24rpx;
            color: #333;
            line-height: 1.3;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .price {
            margin-top: 10rpx;
            font-size: 26rpx;
            color: #ff4444;
          }
        }
      }
    }
  }
}
</style>