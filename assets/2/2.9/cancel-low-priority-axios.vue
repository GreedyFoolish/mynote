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
import axios from "axios";

export default {
  setup() {
    const lowPriorityLoading = ref(false);
    const highPriorityLoading = ref(false);
    const lowPriorityController = new AbortController();

    const loadLowPriorityData = async () => {
      lowPriorityLoading.value = true;
      try {
        const response = await axios.get("/api/low-priority-data", {
          signal: lowPriorityController.signal,
        });
        console.log("低优先级数据加载完成:", response.data);
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

    const loadHighPriorityData = async () => {
      highPriorityLoading.value = true;
      // 取消低优先级请求
      lowPriorityController.abort();
      try {
        const response = await axios.get("/api/high-priority-data");
        console.log("高优先级数据加载完成:", response.data);
      } catch (error) {
        console.error("高优先级请求失败:", error);
      } finally {
        highPriorityLoading.value = false;
      }
    };

    onMounted(() => {
      loadLowPriorityData();
    });

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
