import { defineStore } from "pinia";
import { ref } from "vue";
const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref({});
    // 设置用户信息
    const getUserinfo = (val) => {
      userInfo.value = val;
    };
    // 清除用户信息
    const clearUserinfo = () => {
      userInfo.value = {};
    };
    return {
      userInfo,
      getUserinfo,
      clearUserinfo,
    };
  },
  {
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
        getItem(key) {
          return uni.getStorageSync(key);
        },
      },
    },
  },
);
export default useUserStore;
