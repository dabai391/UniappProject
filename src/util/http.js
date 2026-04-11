import useUserStore from "@/store/userStore.js";
const baseUrl = "https://pcapi-xiaotuxian-front-devtest.itheima.net";
// 请求前拦截
const httpInterceptor = {
  invoke(args) {
    if (!args.url) {
      console.error("HTTP 请求错误: url 不能为空");
      return;
    }
    if (!args.url.startsWith("https")) {
      args.url = baseUrl + args.url;
    }
    args.timeout = 20000;
    args.header = {
      "source-client": "miniapp",
    };
    const userStore = useUserStore();
    if (userStore.userInfo.token) {
      args.header.Authorization = userStore.userInfo.token;
    }
  },
};
uni.addInterceptor("request", httpInterceptor);
uni.addInterceptor("uploadFile", httpInterceptor);
// 响应后拦截
export const http = (args) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...args,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          uni.showToast({
            title: "登录过期，请重新登录",
            icon: "none",
          });
          const userStore = useUserStore();
          userStore.clearUserinfo();
          uni.navigateTo({
            url: "/pages/my/my",
          });
          reject(res);
        } else {
          uni.showToast({
            title: res.data.msg || "请求失败，请稍后重试",
            icon: "none",
          });
          reject(res);
        }
      },
      fail(err) {
        uni.showToast({
          title: err.errMsg || "请求失败，请稍后重试",
          icon: "none",
        });
        reject(err);
      },
    });
  });
};
