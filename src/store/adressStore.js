import { defineStore } from 'pinia'
import { ref } from 'vue'
const adressStore = defineStore('adressStore',()=>{
  const addressList = ref()
  const changeSelectedAddress = (item)=>{
    addressList.value = item
  }
  return {
    addressList,
    changeSelectedAddress
  }
})
export default adressStore
