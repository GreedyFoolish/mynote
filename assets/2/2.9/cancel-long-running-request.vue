<template>
  <div>
    <button @click="download">下载文件</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controller: null
    };
  },
  methods: {
    download() {
      // 创建新的 AbortController 实例
      this.controller = new AbortController();
      const signal = this.controller.signal;
      // 发起新的请求
      fetch(`/api/long-running-task`, {signal}).then(response => {
        response.json()
      }).then(data => {
        console.log(data)
      }).catch(error => {
        if (error.name === "AbortError") {
          console.log("请求被取消");
        } else {
          console.error("请求出错", error);
        }
      });
      // 请求超过五秒后取消请求
      setTimeout(() => {
        this.controller.abort();
        console.log("Request aborted after 5 seconds");
      }, 5000);
    }
  }
};
</script>
