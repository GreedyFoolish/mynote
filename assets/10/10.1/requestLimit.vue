<template>
  <div>
  </div>
</template>

<script setup>
import {fetchWithConcurrency} from "./requestLimit.js"

// 示例 URL
const url = "https://jsonplaceholder.typicode.com/posts/";
// 请求数量
const totalRequests = 100;
// 请求并发数量
const maxConcurrency = 4;
const urlList = Array.from({length: totalRequests}, (_, i) => `${url}${i + 1}`);

fetchWithConcurrency(urlList, maxConcurrency).then(results => {
  console.log("All requests completed. Results:", results);
}).catch(error => {
  console.error("Error during requests:", error);
});
</script>

<style scoped>
</style>
