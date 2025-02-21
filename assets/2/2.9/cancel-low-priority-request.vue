<template>
  <div>
    <h1>主内容区域</h1>
    <button @click="loadHighPriorityData">加载高优先级数据</button>
    <p v-if="lowPriorityLoading">正在加载低优先级数据...</p>
    <p v-if="highPriorityLoading">正在加载高优先级数据...</p>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted} from "vue";

export default {
  setup() {
    const lowPriorityLoading = ref(false);
    const highPriorityLoading = ref(false);
    const lowPriorityController = new AbortController();

    // 加载低优先级数据
    const loadLowPriorityData = async () => {
      lowPriorityLoading.value = true;
      try {
        const response = await fetch("/api/low-priority-data", {
          signal: lowPriorityController.signal,
        });
        const data = await response.json();
        console.log("低优先级数据加载完成:", data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("低优先级请求已取消");
        } else {
          console.error("低优先级请求失败:", error);
        }
      } finally {
        lowPriorityLoading.value = false;
      }
    };

    // 加载高优先级数据
    const loadHighPriorityData = async () => {
      highPriorityLoading.value = true;
      // 取消低优先级请求
      lowPriorityController.abort();
      try {
        const response = await fetch("/api/high-priority-data");
        const data = await response.json();
        console.log("高优先级数据加载完成:", data);
      } catch (error) {
        console.error("高优先级请求失败:", error);
      } finally {
        highPriorityLoading.value = false;
      }
    };

    // 在组件挂载时加载低优先级数据
    onMounted(() => {
      loadLowPriorityData();
    });

    // 在组件销毁时取消低优先级请求
    onUnmounted(() => {
      lowPriorityController.abort();
    });

    return {
      lowPriorityLoading,
      highPriorityLoading,
      loadHighPriorityData,
    };
  },
};
</script>
