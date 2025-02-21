<template>
  <div>
    <input type="text" v-model="query" @input="onInput" placeholder="搜索关键词"/>
    <ul>
      <li v-for="item in results" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      results: [],
      controller: null
    };
  },
  methods: {
    onInput() {
      // 如果之前有请求，取消它
      if (this.controller) {
        this.controller.abort();
      }
      // 创建新的 AbortController 实例
      this.controller = new AbortController();
      const signal = this.controller.signal;
      // 发起新的请求
      fetch(`/api/search?q=${this.query}`, {signal}).then(response => {
        response.json()
      }).then(data => {
        this.results = data;
      }).catch(error => {
        if (error.name === "AbortError") {
          console.log("请求被取消");
        } else {
          console.error("请求出错", error);
        }
      });
    }
  }
};
</script>
