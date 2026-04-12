<template>
  <scroll-view scroll-y class="scroll-view">
    <view class="goods-detail">
    <!-- 商品图片 -->
    <swiper class="goods-image" @change="handleChange" :circular="true">
      <swiper-item v-for="i in mainPictures" :key="i">
        <image :src="i" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
    <view class="goods-index">{{ curIndex + 1 }} / {{ mainPictures.length }}</view>
    <!-- 价格信息 -->
    <view class="price-info">
      <view class="price">¥{{ goodsDetail.price }}</view>
      <view class="sales">{{ goodsDetail.salesCount }}份</view>
    </view>

    <!-- 商品内容 -->
    <view class="content">
      <!-- 商品标题 -->
      <view class="goods-title">
        {{ goodsDetail.name }}
      </view>

      <!-- 促销标签 -->
      <view class="tags">
        <view class="tag">{{ goodsDetail.desc }}</view>

      </view>

      <!-- 配送信息 -->
      <view class="delivery-info">
        <view class="info-item" @tap="openSkuPopup(1)">
          <text>选择规格</text>
          <text>{{ selectArrText }}</text>
        </view>
        <view class="info-item" @tap="openPopup('address')">
          <text>送至：</text>
          <text v-if="addressStoreInstance.addressList">{{ addressStoreInstance.addressList.receiver}} {{addressStoreInstance.addressList.fullLocation}}</text>
          <text v-else>请选择地址</text>
        </view>
      </view>
      <vk-data-goods-sku-popup 
      ref="skuPopup" 
      v-model="skuShow"
      :localdata="localdata"
      :mode="modeSku"
      add-cart-background-color="#FFA868"
      buy-now-background-color="#27BA9B"
      :actived-style="{
          color: '#27BA9B',
          borderColor: '#27BA9B',
          backgroundColor: '#E9F8F5',
        }"
        @add-cart="addCart"
        @buy-now="buyNow"
      />

      <!-- 服务标签 -->
      <view class="service-tags" @tap="openPopup('service')">
        <view class="service">服务</view>
        <view class="service-tag">
          <text>无忧退货</text>
        </view>
        <view class="service-tag">
          <text>快速退款</text>
        </view>
        <view class="service-tag">
          <text>免费退换</text>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" type="bottom" background-color="#fff">
      <AddressPanel v-if="popupName === 'address'" @close="popup?.close()" />
      <ServicePanel v-if="popupName === 'service'" @close="popup?.close()" />
    </uni-popup>
    <view class="similarGoods">
      <view class="title">同类推荐</view>
      <view class="navigator-list">
      <navigator hover-class="none" class="navigator" v-for="item in goodsDetail.similarProducts" :key="item.id"
        :url="`/pages/cate/components/GoodsDetail?id=${item.id}`">
        <view class="image">
          <image :src="item.picture" mode="aspectFill"></image>
        </view>
        <view class="name">{{ item.name }}</view>
        <view class="price">￥{{ item.price }}</view>
      </navigator>
      </view>
    </view>
    <!-- 操作按钮 -->
    <view class="action-buttons">
      <view class=" collect common">
        <image src="@/static/my-icons/icon7.png" mode="aspectFill"></image>
        <text>收藏</text>
      </view>
      <view class=" specification common">
        <image src="@/static/my-icons/icon8.png" mode="aspectFill"></image>
        <text>客服</text>
      </view>
      <view class=" specification common" @tap="gotoCart">
        <image src="@/static/my-icons/icon9.png" mode="aspectFill"></image>
        <text>购物车</text>
      </view>
      <view class="button add-to-cart" @tap="openSkuPopup(2)">
        <text>加入购物车</text>
      </view>
      <view class="button buy-now" @tap="openSkuPopup(3)">
        <text>立即购买</text>
      </view>
    </view>
  </view>
  </scroll-view>
</template>

<script setup>
import { getGoodsDetail } from "@/service/category.js"
import { addCartList } from "@/service/cart.js"
import { ref,computed } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import AddressPanel from './AddressPanel.vue'
import ServicePanel from './ServicePanel.vue'
import adressStore from '@/store/adressStore.js'
import  useUserStore  from '@/store/userStore.js'
const userStore=useUserStore()
const addressStoreInstance=adressStore()
const skuShow = ref(false)
const localdata = ref({})
// uni-ui 弹出层组件 ref
const popup = ref()

// 弹出层条件渲染
const popupName = ref()
const openPopup = (name) => {
  if(name==='address'){
   if(!userStore.userInfo.token){
    return uni.showToast({
      title: '您还没有登录，请先登录',
      icon: 'none'
    })
   }
  }
  // 修改弹出层名称
  popupName.value = name
  // 打开弹出层
  popup.value?.open()
}
const mainPictures = ref([])
const goodsDetail = ref({})
const curIndex = ref(0)
const params = defineProps({
  id: String
})
const getDetail = async () => {
  const res = await getGoodsDetail(params.id)
  mainPictures.value = res.result.mainPictures
  goodsDetail.value = res.result
  localdata.value={
    _id:res.result.id,
    name:res.result.name,
    goods_thumb:res.result.mainPictures[0],
    sku_list:res.result.skus.map(item=>{
      return {
        _id:item.id,
        goods_id: res.result.id,
        goods_name: res.result.namee,
        image:item.picture,
        price:item.price*100,
        stock:item.inventory,
        sku_name_arr:item.specs.map(v=>v.valueName)
      }
    }),
    spec_list:res.result.specs.map(v=>{
      return {
        name:v.name,
        list:v.values
      }
    })
  }
}
const handleChange = (e) => {
  curIndex.value = e.detail.current
}
onLoad(async () => {
  await getDetail()
})
const skuPopup=ref()
const modeSku=ref()
const openSkuPopup = (mode) => {
  modeSku.value=mode
  skuShow.value = true
}
const selectArrText = computed(() => {
  return skuPopup.value?.selectArr?.join(' ').trim() || '请选择商品规格'
})
const addCart = async (e) => {
  await addCartList({
  skuId:e._id,
  count:e.buy_num
 })
 uni.showToast({
  title: '加入购物车成功',
  icon: 'success'
})
  skuShow.value = false
}
const gotoCart=()=>{
  uni.navigateTo({
    url: '/pages/cart/cart'
  })
}
const buyNow=  (selectShop)=>{
  uni.navigateTo({
    url: '/pagesOrder/orderinfo/OrderInfo?skuId='+selectShop.goods_id+'&count='+selectShop.buy_num
  })
}

</script>

<style scoped lang="scss">
.scroll-view {
  height: 100vh;
}
.goods-detail {
  background-color: #fff;
  padding: 0;

  .navbar {
    background-color: #00c09d;
    color: #fff;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;

    .nav-left {
      flex: 1;
    }

    .nav-right {
      margin-left: 20rpx;
    }
  }

  .goods-image {
    width: 100%;
    height: 400rpx;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-index {
    position: absolute;
    top: 359rpx;
    right: -1rpx;
    font-size: 24rpx;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5rpx 10rpx;
    border-radius: 15rpx;
    z-index: 100;
  }

  .price-info {
    background-color: #00c09d;
    color: #fff;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price {
      font-size: 48rpx;
      font-weight: bold;
    }

    .sales {
      font-size: 28rpx;
    }
  }

  .content {
    padding: 20rpx;

    .goods-title {
      font-size: 32rpx;
      color: #333;
      margin-bottom: 15rpx;
      line-height: 1.4;
    }

    .tags {
      display: flex;
      gap: 10rpx;
      margin-bottom: 20rpx;

      .tag {
        background-color: #f0f9ff;
        color: #1890ff;
        font-size: 24rpx;
        padding: 5rpx 15rpx;
        border-radius: 15rpx;
      }
    }

    .delivery-info {
      border-top: 1rpx solid #f0f0f0;
      padding-top: 20rpx;
      margin-bottom: 20rpx;

      .info-item {
        display: flex;
        margin-bottom: 15rpx;

        text {
          &:first-child {
            width: 120rpx;
            font-size: 28rpx;
            color: #999;
          }

          &:last-child {
            flex: 1;
            font-size: 28rpx;
            color: #333;
          }
        }
      }
    }

    .service-tags {
      display: flex;
      gap: 55rpx;
      margin-bottom: 30rpx;
      margin-top: 30rpx;

      .service {
        font-size: 32rpx;
        color: #999;
      }

      .service-tag {
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #333;
      }
    }
  }
  .similarGoods {
    .title {
        font-size: 36rpx;
        color: #333;
        padding: 20rpx 10rpx;
      }
    .navigator-list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .navigator {
          width: 30%;
          margin-bottom: 20rpx;
          background-color: #fff;
          padding: 20rpx;
          border-radius: 20rpx;
          box-sizing: border-box;
          box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

          image {
            width: 200rpx;
            height: 200rpx;
          }
          .name {
            font-size: 26rpx;
            color: #333;
          }
          .price {
            font-size: 30rpx;
            color: #ff4444;
          }
        }
      }
  }
  
 

  .action-buttons {
    width: 100%;
    // height: 120rpx;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1rpx solid #f0f0f0;
    position: relative;
    bottom: 0;
    left: 0;
    // z-index: 100;
    background-color: #fff;
    /* 关键代码：自动留出安全区距离 */
      padding-bottom: env(safe-area-inset-bottom);
      /* 兼容老设备 */
      padding-bottom: constant(safe-area-inset-bottom);
      .common{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
        color: #333;
        image{
          width: 60rpx;
          height: 60rpx;
        }
      }
    .button {
      width: 200rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 40rpx;
      font-size: 28rpx;
      margin: 0 10rpx;

      &.add-to-cart {
        background-color: #fff2e8;
        color: #ff8c00;
        border: 1rpx solid #ff8c00;
      }

      &.buy-now {
        background-color: #00c09d;
        color: #fff;
      }
    }
  }
}
</style>