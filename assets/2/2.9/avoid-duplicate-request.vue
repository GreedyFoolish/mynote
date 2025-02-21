<template>
  <div>
    <h1>用户信息查询</h1>
    <button @click="fetchUserInfo">获取用户信息</button>
    <p v-if="loading">加载中...</p>
    <p v-else-if="userInfo">用户信息：{{ userInfo }}</p>
    <p v-else>点击按钮获取用户信息</p>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "UserInfo",
  setup() {
    const userInfo = ref("");
    const loading = ref(false);
    // 用于存储 AbortController 实例
    let controller;

    const fetchUserInfo = async () => {
      // 如果之前有未完成的请求，取消它
      if (controller) {
        controller.abort();
        console.log("取消之前的请求");
      }

      // 创建新的 AbortController 实例
      controller = new AbortController();
      loading.value = true;

      try {
        const response = await fetch("https://api.example.com/user", {
          signal: controller.signal, // 将信号传递给 fetch 请求
        });
        if (!response.ok) {
          throw new Error("请求失败");
        }
        const data = await response.json();
        userInfo.value = data.name;
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("当前请求被取消");
        } else {
          console.error("请求失败:", error);
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      userInfo,
      loading,
      fetchUserInfo,
    };
  },
};
</script>
