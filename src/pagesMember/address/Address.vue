<template>
  <uni-swipe-action class="addresslist">
    <uni-swipe-action-item v-for="item in addressList" :key="item.id" class="address-item" @tap="changeSelectedAddress(item)">
      <view class="address-header">
        <view class="name-phone">
          <text class="name">{{ item.receiver }}</text>
          <text class="phone">{{ item.contact }}</text>
          <text v-if="item.isDefault" class="default-tag">默认</text>
        </view>
        <image class="edit" src="/static/my-icons/icon6.png" @tap.stop="editAdress(item)"></image>
      </view>
      <view class="address-content">
        {{ item.fullLocation }} {{ item.address }}
      </view>
      <template #right>
        <button class="delete-btn" @tap.stop="deleteaddress(item)">删除</button>
      </template>
    </uni-swipe-action-item>
  </uni-swipe-action>
  <view class="addAddress" @click="toAddAddress">添加地址</view>
</template>

<script setup>
import { getAddressList,deleteAddress } from '@/service/my.js'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import adressStore from '@/store/adressStore.js'
const adress = adressStore()

//获取地址列表
const addressList = ref([])

//获取地址列表
const getaddressList = async () => {
  const res = await getAddressList()
  addressList.value = res.result
}

onShow(() => {
  getaddressList()
})

//添加地址
const toAddAddress = () => {
  uni.navigateTo({
    url: "/pagesMember/address/EditAdress",
  })
}

//编辑地址
const editAdress = (item) => {
  uni.navigateTo({
    url: `/pagesMember/address/EditAdress?id=${item.id}`,
  })
}
//删除地址
const deleteaddress =  (item) => {
  uni.showModal({
    title: '提示',
    content: '确定删除该地址吗？',
    success: async (res) => {
      if (res.confirm) {
        // 确认删除
        const res1= await deleteAddress(item.id)
        if(res1.result){
          getaddressList()
          uni.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    }
  })
}
//选择地址
const changeSelectedAddress = (item) => {
  adress.changeSelectedAddress(item)
  uni.navigateBack()
}

</script>

<style>
</style>

<style scoped lang="scss">
.addresslist {
  margin-top: 20rpx;
  .address-item {
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    border-bottom: 2rpx solid #aeacac;
    .address-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15rpx;
      padding: 20rpx;
      .name-phone {
        display: flex;
        align-items: center;
        gap: 20rpx;

        .name {
          font-size: 32rpx;
          color: #333;
          font-weight: 500;
        }

        .phone {
          font-size: 30rpx;
          color: #666;
        }

        .default-tag {
          font-size: 24rpx;
          color: #00c09d;
          padding: 2rpx 15rpx;
          border: 2rpx solid #00c09d;
          border-radius: 15rpx;
        }
      }

      .edit {
        width: 50rpx;
        height: 50rpx;
      }
    }

    .address-content {
      font-size: 32rpx;
      color: #666;
      line-height: 1.4;
      padding-left: 30rpx;
    }
    .delete-btn {
      font-size: 32rpx;
      color: #fff;
      background-color: #00c09d;
      padding: 10rpx;
      border-radius: 15rpx;
    }
  }
}

.addAddress {
  width: 94%;
  height: 80rpx;
  position: fixed;
  bottom: 65rpx;
  left: 3%;
  right: 3%;
  background-color: #27ba9b;
  color: #fff;
  text-align: center;
  line-height: 80rpx;
  border-radius: 40rpx;
}
</style>
