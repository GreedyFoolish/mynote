<template>
  <div>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted} from "vue";
import requestManager from "./GlobalRequestManager";

export default {
  setup() {
    const lowPriorityLoading = ref(false);

    const loadLowPriorityData = async () => {
      const controller = new AbortController();
      requestManager.registerLowPriorityRequest(controller);

      lowPriorityLoading.value = true;
      try {
        const response = await fetch("/api/low-priority-data", {
          signal: controller.signal,
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

    onMounted(() => {
      loadLowPriorityData();
    });

    onUnmounted(() => {
      requestManager.cancelLowPriorityRequests();
    });

    return {
      lowPriorityLoading,
    };
  },
};
</script>
