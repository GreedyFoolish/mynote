<template>
  <div>
    <div v-for="message in messageList">
      <div :class="message.value === 0 ? 'message-start' : 'message-end'">
        {{ message.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import PLimitV620 from "assets/10/10.1/p-limit-v6.2.0";

const messageList = ref([]);
// 限制同时执行的操作数量为 2
const limit = PLimitV620(2);

const asyncTask = (id) => {
  return limit(() => {
    return new Promise((resolve) => {
      // console.log(`Start task ${id}`);
      messageList.value.push({
        label: `Start task ${id}`,
        value: 0
      })
      setTimeout(() => {
        // console.log(`End task ${id}`);
        messageList.value.push({
          label: `End task ${id}`,
          value: 1
        })
        resolve();
      }, 1000);
    });
  });
};

for (let i = 1; i <= 50; i++) {
  asyncTask(i);
}

</script>

<style scoped>
.message-start {
  color: #409EFF;
}

.message-end {
  color: #67C23A;
}
</style>
