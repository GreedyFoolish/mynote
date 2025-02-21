<template>
  <div>
    <button @click="download">下载文件</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    download() {
      // 创建新的 CancelToken 实例
      const source = axios.CancelToken.source();
      // 使用 AbortController 方式
      // 创建新的 AbortController 实例
      // const controller = new AbortController();
      // 发起新的请求
      fetch(`/api/long-running-task`, {
        cancelToken: source.token
        // 使用 AbortController 方式
        // signal: controller.signal
      }).then(data => {
        console.log(data)
      }).catch(error => {
        // 使用 AbortController 方式
        // if (error.name === "AbortError") {
        if (axios.isCancel(error)) {
          console.log("请求被取消");
        } else {
          console.error("请求出错", error);
        }
      });
      // 请求超过五秒后取消请求
      setTimeout(() => {
        // 使用 AbortController 方式
        // controller.abort();
        source.cancel("Request canceled after 5 seconds");
      }, 5000);
    }
  }
};
</script>
