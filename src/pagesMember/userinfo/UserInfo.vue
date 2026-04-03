<template>
  <view class="nav">
    <text>个人信息</text>
   <image :src="profile.avatar || '/static/images/car.png'"></image>
   <button @tap="handleAvatar">更改用户头像</button>
  </view>
  <view class="info">
    <view class="account common">
      <text>账号</text>
      <text>{{ profile.account }}</text>
    </view>
    <view class="nickname common">
      <text>昵称</text>
      <input placeholder="请输入昵称" v-model="nickname" />
    </view>
    <view class="sex common">
      <text>性别</text>
      <view>
        <radio-group @change="handleChangeSex" activeBackgroundColor="#00cca7">
          <label class="radio"><radio value="男" :checked="gender==='男'"  />男</label>
          <label class="radio"><radio value="女" :checked="gender==='女'"  />女</label>
        </radio-group>
      </view>
    </view>
    <view class="birthday common  ">
      <text>出生日期</text>
     <view class="uni-list-cell-db">
        <picker mode="date" :value="birthday"  @change="bindDateChange">
          <view class="uni-input" style="margin-left: -70rpx;">{{birthday || '请选择出生日期' }}</view>
        </picker>
      </view>
    </view>
    <view class="city common">
      <text>城市</text>
     <view class="uni-list-cell-db">
        <picker mode="region" :value="fullLocation" @change="bindRegionChange">
          <view class="uni-input">{{ fullLocation  || '请选择城市' }}</view>
        </picker>
      </view>
    </view>
    <view class="job common">
      <text>职业</text>
      <input  placeholder="请输入职业" v-model="profession" />
    </view>
  </view>
  <button class="save" @tap="handleSave">保存</button>

</template>
<script setup>
import { ref } from 'vue'
import useUserStore from '@/store/userStore.js'
import { getProfile, updateProfile } from '@/service/my.js'
import { onLoad } from '@dcloudio/uni-app'

const userStore = useUserStore()
const profile=ref({})
const nickname=ref('')
const profession=ref('')
const gender=ref('')
const birthday=ref('')
const fullLocation=ref('')

let filePath=''
const handleAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      filePath=res.tempFilePaths[0]
      uni.uploadFile({
        url: '/member/profile/avatar',
        filePath,
        name: 'file',
        success: (res) => {
        }
      })
    }
  })
}
const handleChangeSex = (e) => {
  gender.value=e.detail.value
}
const bindDateChange = (e) => {
  birthday.value=e.detail.value
}
let provinceCode=''
let cityCode=''
let countyCode=''
const bindRegionChange = (e) => {
  provinceCode=e.detail.code[0]
  cityCode=e.detail.code[1]
  countyCode=e.detail.code[2]
  fullLocation.value=e.detail.value.join(' ')
}
 
onLoad(async () => {
  const res = await getProfile()
  profile.value=res.result
  nickname.value=res.result.nickname
  profession.value=res.result.profession
  gender.value=res.result.gender
  birthday.value=res.result.birthday
  fullLocation.value=res.result.fullLocation
})
const handleSave = async () => {
 const res= await updateProfile({
    nickname: nickname.value,
    gender: gender.value,
    birthday: birthday.value,
    profession: profession.value,
    provinceCode,
    cityCode,
    countyCode
  })
 userStore.userInfo.nickname=res.result.nickname
  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })
  setTimeout(() => {
    uni.navigateBack({
      delta: 1
    })
  }, 1000);
}
</script>
<style>
page{
  background-color: #f4f4f4;
}
</style>
<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400rpx;
  background-color: #00cca7;
  padding-top: 60rpx;
  text{
    font-size: 36rpx;
    color: #fff;
  }
  image{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-top: 40rpx;
  }
  button{
    width: 400rpx;
    height: 80rpx;
    font-size: 36rpx;
    color: #fff;
    margin-top: 10rpx;
    background-color: transparent;
  }
}
.info{
  padding-left: 30rpx;
  background-color: #fff;
  margin-top: 30rpx;
  .common{
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 36rpx;
    color: #333;
    border-radius: 10rpx;
    background-color: #fff;
    border-bottom: 1rpx solid #ccc;
    display: flex;
    align-items: center;
    gap: 150rpx;
  }
  .job{
    border-bottom: none;
  }
}
.save{
  margin: 40rpx auto;
  background-color: #00cca7;
  width: 98%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 40rpx;
  color: #fff;
  font-size: 36rpx;
}
</style>
