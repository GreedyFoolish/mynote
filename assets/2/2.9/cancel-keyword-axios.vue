<template>
  <div>
    <input type="text" v-model="query" @input="onInput" placeholder="搜索关键词"/>
    <ul>
      <li v-for="item in results" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      query: "",
      results: [],
      cancelTokenSource: null
    };
  },
  methods: {
    onInput() {
      // 如果之前有请求，取消它
      if (this.cancelTokenSource) {
        this.cancelTokenSource.cancel("取消前一个请求");
      }
      // 创建新的 CancelToken 实例
      this.cancelTokenSource = axios.CancelToken.source();
      // 发起新的请求
      axios.get("/api/search", {
        params: {q: this.query},
        cancelToken: this.cancelTokenSource.token
      }).then(response => {
        this.results = response.data;
      }).catch(error => {
        if (axios.isCancel(error)) {
          console.log("请求被取消", error.message);
        } else {
          console.error("请求出错", error);
        }
      });
    }
  }
};
</script>
