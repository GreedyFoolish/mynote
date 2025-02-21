<template>
  <div>
    <button @click="fetchData">Fetch Data</button>
    <p>{{ data }}</p>
  </div>
</template>

<script>
import {fetchWithAbort} from "./request";

export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        this.data = await fetchWithAbort("https://api.example.com/data", {}, 3, 2000);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>
