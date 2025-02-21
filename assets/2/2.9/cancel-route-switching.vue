<template>
  <div>
    <h1>用户详情</h1>
    <p v-if="loading">加载中...</p>
    <p v-else>用户信息：{{ userInfo }}</p>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted} from "vue";
import {useRoute} from "vue-router";

export default {
  name: "UserDetail",
  setup() {
    const userInfo = ref("");
    const loading = ref(true);
    const route = useRoute();
    const controller = new AbortController(); // 创建 AbortController 实例

    // 获取用户信息的函数
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://api.example.com/user/${route.params.id}`, {
          signal: controller.signal, // 将信号传递给 fetch 请求
        });
        if (!response.ok) {
          throw new Error("请求失败");
        }
        const data = await response.json();
        userInfo.value = data.name;
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("请求已取消");
        } else {
          console.error("请求失败:", error);
        }
      } finally {
        loading.value = false;
      }
    };

    // 在组件挂载时发起请求
    onMounted(() => {
      fetchUserInfo();
    });

    // 在组件卸载时取消请求
    onUnmounted(() => {
      controller.abort(); // 触发取消操作
      console.log("取消请求");
    });

    return {
      userInfo,
      loading,
    };
  },
};
</script>
