<template>
  <scroll-view scroll-y>
    <view class="order-detail">
      <!-- 顶部导航栏 -->
      <view class="nav-bar">
        <view v-if="orderState == '待付款'">
          <view class="status">{{ orderState }}</view>
          <!-- 订单金额和倒计时 -->
          <view class="amount-section">
            <text class="amount-label">支付金额</text>
            <text class="amount-value">¥{{ goodsObj.totalMoney }}</text>
            <text class="countdown-label">去支付</text>
            <uni-countdown :show-day="false" minute="30" :second="0" color="#fff" :showColon="false" splitorColor="#fff"
              @timeup="stateChange" />
          </view>
          <button class="pay">去支付</button>
        </view>
        <view v-else>
          <view class="status-text">{{ orderState }}</view>
          <view class="btn">
            <button class="buy-btn">再次购买</button>
            <button class="delivery-btn " @tap="delivery" v-if="orderState == '待发货'">模拟发货</button>
            <button class="confirm-btn " @tap="confirm" v-if="orderState == '待收货'">确认收货</button>
          </view>
        </view>
      </view>
      <view class="address-content common">
        <view class="receiver">{{ goodsObj.receiverContact }} {{ goodsObj.receiverMobile }}</view>
        <view class="address">{{ goodsObj.receiverAddress }}</view>
      </view>
      <view class="wuliu common" v-for="(item, index) in logisticsList" :key="item.id">
        <view>{{ item.text }} </view>
        <view>{{ item.time }}</view>
      </view>

      <!-- 商品列表 -->
      <view class="goods-section">
        <view class="goods-item" v-for="(item, index) in goodsList" :key="index">
          <view class="goods-image">
            <image :src="item.image" mode="aspectFit" />
          </view>
          <view class="goods-info">
            <view class="goods-name">{{ item.name }}</view>
            <view class="goods-spec">{{ item.attrsText }}</view>
            <view class="goods-price">
              <text class="price">¥{{ item.curPrice }}</text>
              <text class="count">×{{ item.quantity }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 价格详情 -->
      <view class="price-section">
        <view class="price-item">
          <text class="price-label">商品总价</text>
          <text class="price-value">¥{{ goodsObj.totalMoney }}</text>
        </view>
        <view class="price-item">
          <text class="price-label">运费</text>
          <text class="price-value">¥{{ goodsObj.postFee }}</text>
        </view>
        <view class="price-item total">
          <text class="price-label">应付金额</text>
          <text class="price-value total-price">¥{{ goodsObj.payMoney }}</text>
        </view>
      </view>
      <!-- 底部操作按钮 -->
      <view class="bottom-buttons">
        <button class="cancel-btn" v-if="[1, 2].includes(goodsObj.orderState)" @tap="cancelOrder">取消订单</button>
        <button class="pay-btn" @tap="goPay" v-if="orderState == '待付款'">去支付</button>
        <view v-if="[4, 5, 6].includes(goodsObj.orderState)" class="footer-btn">
          <button class=" btncommon delete-btn " @tap="deleteorder">删除订单</button>
          <button class=" btncommon evaluate-btn " @tap="evaluate">去评价</button>
          <button class=" btncommon buyonce-btn " @tap="buyOnce">再次购买</button>
        </view>
      </view>
    </view>
  </scroll-view>

</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getOrderDetail, payOrder, deliveryOrder, confirmOrder, getOrderLogistics, deleteOrder } from '@/service/order.js'
const props = defineProps({
  orderId: {
    type: String,
    default: ''
  }
})
// 商品数据
const goodsObj = ref({})
const goodsList = ref([])
const logisticsList = ref([])
const getdetail = async () => {
  const res = await getOrderDetail(props.orderId)
  goodsObj.value = res.result
  goodsList.value = res.result.skus
  if ([4, 5, 6].includes(goodsObj.value.orderState)) {
    const logisticsRes = await getOrderLogistics(props.orderId)
    logisticsList.value = logisticsRes.result.list
  }
}
const orderStateList = ref([
  { id: 1, text: '待付款' },
  { id: 2, text: '待发货' },
  { id: 3, text: '待收货' },
  { id: 4, text: '待评价' },
  { id: 5, text: '已完成' },
  { id: 6, text: '已取消' }
])
const orderState = computed(() => {
  return orderStateList.value.find(item => item.id == goodsObj.value.orderState)?.text
})
const stateChange = () => {
  goodsObj.value.orderState = 6
}
onLoad(() => {
  // 页面加载时的逻辑
  getdetail()
})
//去支付
const goPay = async () => {
  if (import.meta.env.DEV) {
    await payOrder({ orderId: props.orderId })
    uni.showToast({
      title: '支付成功',
      icon: 'success'
    })
    goodsObj.value.orderState = 2
    // uni.navigateTo({
    //   url: `/pagesOrder/payment/PayMemt?id=${props.orderId}`
    // })
  }
}
//模拟发货
const delivery = async () => {
  await deliveryOrder(props.orderId)
  uni.showToast({
    title: '发货成功',
    icon: 'success'
  })
  goodsObj.value.orderState = 3
}
//确认收货
const confirm = async () => {
  const res = await confirmOrder(props.orderId)
  uni.showToast({
    title: '确认收货成功',
    icon: 'success'
  })
  goodsObj.value.orderState = res.result.orderState
}
//删除订单
const deleteorder =  () => {
  uni.showModal({
    title: '提示',
    content: '确定删除订单吗？',
    success: async (res) => {
      if (res.confirm) {
        await deleteOrder({ ids: [props.orderId] })
        uni.showToast({
          title: '删除订单成功',
          icon: 'success'
        })
        setTimeout(() => {
          uni.redirectTo({
            url: '/pagesOrder/orderlist/OrderList'
          })
        }, 1000)
      }
    }
  })
}

</script>

<style scoped lang="scss">
.order-detail {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;

  // 顶部导航栏
  .nav-bar {
    width: 100%;
    height: 290rpx;
    background-color: #00c9a5;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 56rpx;

    .status {
      font-size: 30rpx;
      text-align: center;
    }

    .amount-section {
      margin-top: 20rpx;
      font-size: 26rpx;
      display: flex;
      align-items: center;
      gap: 10rpx;
    }

    .pay {
      width: 214rpx;
      height: 89rpx;
      background-color: #fff;
      color: #00c9a5;
      margin-top: 30rpx;
      border-radius: 45rpx;
      text-align: center;
      line-height: 89rpx;
    }

    .status-text {
      font-size: 35rpx;
      text-align: center;
    }

    .btn {
      margin-top: 15rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20rpx;

      .buy-btn,
      .delivery-btn,
      .confirm-btn {
        width: 214rpx;
        height: 89rpx;
        background-color: #fff;
        color: #00c9a5;
        margin-top: 30rpx;
        border-radius: 45rpx;
        text-align: center;
        line-height: 89rpx;
      }
    }
  }

  // 收货人信息
  .common {
    width: 100%;
    background-color: #fff;
    padding: 25rpx 40rpx;
    font-size: 30rpx;
    color: #000;
    border-bottom: 2rpx solid #999;
  }

  // 商品列表
  .goods-section {
    background-color: #fff;
    margin-top: 20rpx;

    .goods-item {
      display: flex;
      padding: 30rpx;
      border-bottom: 1rpx solid #f0f0f0;

      .goods-image {
        width: 150rpx;
        height: 150rpx;
        margin-right: 20rpx;

        image {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }
      }

      .goods-info {
        flex: 1;

        .goods-name {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 10rpx;
          line-height: 1.3;
        }

        .goods-spec {
          font-size: 24rpx;
          color: #999;
          margin-bottom: 20rpx;
        }

        .goods-price {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .price {
            font-size: 28rpx;
            color: #da3134;
            font-weight: bold;
          }

          .count {
            font-size: 24rpx;
            color: #999;
          }
        }
      }
    }
  }

  // 价格详情
  .price-section {
    background-color: #fff;
    padding: 30rpx;
    margin-top: 20rpx;

    .price-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .price-label {
        font-size: 28rpx;
        color: #666;
      }

      .price-value {
        font-size: 28rpx;
        color: #333;
      }

      &.total {
        margin-top: 20rpx;
        padding-top: 20rpx;
        border-top: 1rpx solid #f0f0f0;

        .price-label {
          font-size: 32rpx;
          font-weight: bold;
        }

        .price-value.total-price {
          font-size: 32rpx;
          color: #da3134;
          font-weight: bold;
        }
      }
    }
  }

  // 底部操作按钮
  .bottom-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10rpx 0;
    background-color: #fff;
    border-top: 1rpx solid #f0f0f0;
    /* 关键代码：自动留出安全区距离 */
    padding-bottom: env(safe-area-inset-bottom);
    /* 兼容老设备 */
    padding-bottom: constant(safe-area-inset-bottom);

    .cancel-btn {
      width: 200rpx;
      height: 80rpx;
      font-size: 28rpx;
      color: #666;
      background-color: #f5f5f5;
      border-radius: 40rpx;
      margin-right: 20rpx;
      line-height: 80rpx;
      text-align: center;
    }

    .pay-btn {
      width: 200rpx;
      height: 80rpx;
      font-size: 28rpx;
      color: #fff;
      background-color: #00c09d;
      border-radius: 40rpx;
      line-height: 80rpx;
      text-align: center;
    }

    .footer-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20rpx;
    }

    .btncommon {
      width: 200rpx;
      height: 80rpx;
      font-size: 28rpx;
      background-color: #fff;
      border-radius: 40rpx;
      line-height: 80rpx;
      text-align: center;
      border: 1rpx solid #fff;
    }
    .delete-btn {
      color: #da3134;
    }

    .evaluate-btn {
      color: #000;
    }

    .buyonce-btn {
      color: #00c9a5;
    }
  }
}
</style>