<template>
  <scroll-view class="order-list" scroll-y>
    <!-- 加载状态 -->
    <view v-if="loading" class="loading">
      <text>加载中...</text>
    </view>

    <!-- 订单列表 -->
    <view v-else>
      <!-- 订单项 -->
      <view v-for="item in orderList" :key="item.id" class="order-item">
        <view class="orderremark">
          <text class="time">{{ item.createTime }}</text>
          <text class="state">{{ orderStateMap[item.orderState] || '' }}</text>
        </view>
        <view class="order-info" v-for="i in item.skus">
          <view class="img-text">
            <image class="order-img" :src="i.image" mode="aspectFill"></image>
            <view class="order-info-text">
              <text class="name">{{ i.name }}</text>
              <text class="attrsText">{{ i.attrsText }}</text>
            </view>
          </view>
          <view class="order-num">
            <text>共{{ i.quantity }}件商品</text>
            <text>实付¥{{ i.realPay }}</text>
          </view>
          <view class="order-btn">
            <button >查看详情</button>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="orderList?.length === 0" class="empty">
        <text>暂无订单</text>
      </view>
    </view>
  </scroll-view>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { getOrderList } from '@/service/order.js'

// 定义props
const props = defineProps({
  state: {
    type: Number,
    default: 0
  }
})

const orderList = ref([])
const loading = ref(false)

const getOrderListFn = async () => {
  // 开始加载
  loading.value = true
  try {
    const res = await getOrderList({
      page: 1,
      pageSize: 10,
      orderState: props.state
    })
    // 延迟赋值，避免页面突然变化
    setTimeout(() => {
      orderList.value = res.result.items
      loading.value = false
    }, 100)
  } catch (error) {
    console.error('获取订单列表失败:', error)
    loading.value = false
  }
}
onMounted(() => {
  getOrderListFn()
})
// 监听props.state变化，重新获取订单列表
watch(() => props.state, () => {
  getOrderListFn()
})
// 订单状态映射
const orderStateMap = {
  1: '待付款',
  2: '待发货',
  3: '待收货',
  4: '待评价',
  5: '已完成',
  6: '已取消'
}
</script>
<style lang="scss">
.order-list {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;

  .orderremark {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .state {
      font-size: 30rpx;
      color: #000;
      text-align: right;
    }
  }

  .order-info {
    background-color: #fff;
    border-bottom: 2rpx solid #f5f5f5;

    .img-text {
      display: flex;
      align-items: center;
      padding: 20rpx;
      gap: 20rpx;

      .order-img {
        width: 200rpx;
        height: 200rpx;
      }

      .order-info-text {
        display: flex;
        flex-direction: column;
        gap: 5rpx;

        .name {
          font-size: 30rpx;
        }

        .attrsText {
          font-size: 28rpx;
          color: #999;
        }
      }
    }

    .order-num {
      text-align: right;
      color: #000;

      text {
        margin-right: 20rpx;
      }

      border-bottom: 2rpx solid #f5f5f5;
    }

    .order-btn {
      margin-top: 20rpx;
      text-align: right;

      button {
        margin-right: 20rpx;
        width: 200rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 40rpx;
        background-color: #00c09d;
        color: #fff;
        font-size: 30rpx;
        border: none;
      }
    }
  }

  // 加载状态
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200rpx;
    font-size: 28rpx;
    color: #999;
  }

  // 空状态
  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200rpx;
    font-size: 28rpx;
    color: #000;
  }
}
</style>