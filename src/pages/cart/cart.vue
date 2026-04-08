<template>
  <uni-swipe-action class="cart-list" v-if="cartList.length">
    <uni-swipe-action-item v-for="item in cartList" :key="item.skuId">
      <view class="goodslist">
        <checkbox :checked="item.selected" @tap="changeChecked(item)" />
        <view class="image">
          <image :src="item.picture" mode="scaleToFill" />
        </view>
        <view class="info">
          <view class="name">{{ item.name }}</view>
          <view class="spec">{{ item.attrsText }}</view>
          <view class="price">¥{{ item.nowPrice }}</view>
        </view>
        <uni-number-box @change="changeValue(item)" v-model="item.count" class="count" :index="item.skuId" />
      </view>
      <template #right>
        <view class="delete">
          <button class="delete-btn" @tap="deleteItem(item.skuId)">删除</button>
        </view>
      </template>
    </uni-swipe-action-item>
  </uni-swipe-action>
  <view v-else>
    <view class="empty">
      <view class="empty-text">购物车为空，快去选购吧</view>
      <button class="empty-btn">去首页</button>
    </view>
  </view>
  <view class="total">
    <view class="left">
      <checkbox :checked="isAllChecked" @tap="changeAll" />
      <view class="totalprice">合计：<text>¥{{ totalPrice.toFixed(2) }}</text></view>
    </view>
    <view class="right">
      <button class="pay-btn" :class="totalCount === 0 ? 'disabled' : ''" @tap="gotoPay()">去结算({{ totalCount }})</button>
    </view>
  </view>
</template>
<script setup>
import { ref, computed } from 'vue'
import { getCartList, deleteCart, updateGoodsCount, updateCartSelected } from '@/service/cart.js'
import { onShow } from '@dcloudio/uni-app'
const cartList = ref([])
const getList = async () => {
  const res = await getCartList()
  cartList.value = res.result
}
onShow(() => getList())
// 删除购物车商品
const deleteItem = (skuId) => {
  uni.showModal({
    title: "删除",
    content: "确定删除吗？",
    success: async (res) => {
      if (res.confirm) {
        await deleteCart({ ids: [skuId] })
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
        getList()
      }
    }
  })
}
//修改商品数量
const changeValue = async (item) => {
  await updateGoodsCount(item.skuId, { count: item.count, selected: item.selected })
  getList()
}
const changeChecked = async (item) => {
  item.selected = !item.selected
  await updateGoodsCount(item.skuId, { count: item.count, selected: item.selected })
  getList()
}
const isAllChecked = computed(() => {
  return cartList.value.length && cartList.value.every(item => item.selected)
})
const changeAll = async () => {
  const _isAllChecked = !isAllChecked.value
  cartList.value.forEach(item => {
    item.selected = _isAllChecked
  })
  await updateCartSelected({ selected: _isAllChecked })
  getList()
}
//计算选中单品
const totalCount = computed(() => {
  return cartList.value.filter(item => item.selected).reduce((pre, item) => {
    return pre + item.count
  }, 0)
})
//计算总价格
const totalPrice = computed(() => {
  return cartList.value.filter(item => item.selected).reduce((pre, item) => {
    return pre + item.nowPrice * item.count
  }, 0)
})
const gotoPay = () => {
  if (totalCount.value === 0) {
    uni.showToast({
      title: '请选择商品',
      icon: 'none'
    })
    return
  }
  uni.showToast({
    title: '去结算',
    icon: 'success'
  })
}
</script>
<style>
page {
  background-color: #f5f5f5;
}
</style>
<style scoped lang="scss">
.cart-list {

  padding: 0;
  width: 100%;

  .goodslist {
    // background-color: #fff;
    width: 100%;
    padding: 20rpx;
    display: flex;
    gap: 15rpx;
    align-items: center;

    .image {
      image {
        width: 150rpx;
        height: 150rpx;
        // margin-right: 20rpx;
      }
    }

    .name {
      font-size: 28rpx;
      color: #333;
    }

    .spec {
      font-size: 24rpx;
      color: #999;
    }

    .price {
      font-size: 28rpx;
      color: #da3134;
    }

    .count {
      margin-top: 90rpx;
    }
  }

  .delete-btn {
    margin-left: 50rpx;
    width: 120rpx;
    height: 160rpx;
    font-size: 26rpx;
    color: #fff;
    background-color: #da3134;
    text-align: center;
    line-height: 160rpx;
  }
}

.empty {
  width: 100%;
  height: 400rpx;

  .empty-text {
    font-size: 30rpx;
    color: #333;
    text-align: center;
    margin-top: 150rpx;
  }

  .empty-btn {
    width: 200rpx;
    height: 80rpx;
    font-size: 28rpx;
    color: #fff;
    background-color: #00c09d;
    border-radius: 40rpx;
    margin-top: 30rpx;
  }
}

.total {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  // height: 120rpx;
  display: flex;
  align-items: center;
  padding-left: 47rpx;
  padding-top: 15rpx;
  background-color: #fff;
  /* 关键代码：自动留出安全区距离 */
  padding-bottom: env(safe-area-inset-bottom);
  /* 兼容老设备 */
  padding-bottom: constant(safe-area-inset-bottom);

  .left {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20rpx;
    .totalprice {
      font-size: 28rpx;

      text {
        color: #da3134;
      }
    }
  }

  .right {
    .pay-btn {
      width: 200rpx;
      height: 80rpx;
      font-size: 28rpx;
      color: #fff;
      background-color: #00c09d;
      border-radius: 40rpx;
      margin-bottom: 30rpx;
      margin-right: 100rpx;
    }

    .disabled {
      background-color: #999;
    }
  }
}
</style>